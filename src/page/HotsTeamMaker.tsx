import React, { useState, useEffect } from "react";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Save,
  Folder,
  Trash2,
  Shuffle,
  RotateCcw,
  Gamepad2,
  Users,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

interface TeamData {
  playerPool: string[];
  teamA: string[];
  teamB: string[];
}

interface SavedTeam {
  id: string;
  name: string;
  data: TeamData;
  createdAt: string;
}

interface DraggablePlayerProps {
  id: string;
  name: string;
  containerId: string;
  onRemove?: (name: string) => void;
}

const STORAGE_KEY = "hots-team-maker-data";

const DraggablePlayer: React.FC<DraggablePlayerProps> = ({
  id,
  name,
  containerId,
  onRemove,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        flex items-center justify-between p-3 mb-2 rounded-lg border
        ${isDragging ? "opacity-50 z-50" : "opacity-100"}
        ${
          containerId === "teamA"
            ? "bg-blue-50 border-blue-200"
            : containerId === "teamB"
              ? "bg-red-50 border-red-200"
              : "bg-gray-50 border-gray-200"
        }
        hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing
      `}
    >
      <span className="font-medium text-gray-900">{name}</span>
      {onRemove && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(name);
          }}
          className="text-red-500 hover:text-red-700 hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

/**
 * 히오스 팀 메이커 컴포넌트
 * 플레이어 입력, 드래그 앤 드롭으로 팀 구성, 로컬스토리지 저장/불러오기
 */
export const HotsTeamMaker: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [teamData, setTeamData] = useState<TeamData>({
    playerPool: [],
    teamA: [],
    teamB: [],
  });
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [saveTeamName, setSaveTeamName] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    loadSavedTeams();
  }, []);

  const loadSavedTeams = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSavedTeams(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load saved teams:", error);
    }
  };

  const saveTeamToStorage = (name: string) => {
    try {
      const newTeam: SavedTeam = {
        id: Date.now().toString(),
        name,
        data: teamData,
        createdAt: new Date().toISOString(),
      };

      const updatedTeams = [...savedTeams, newTeam];
      setSavedTeams(updatedTeams);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTeams));
      setSaveDialogOpen(false);
      setSaveTeamName("");
    } catch (error) {
      console.error("Failed to save team:", error);
    }
  };

  const loadTeamFromStorage = (savedTeam: SavedTeam) => {
    setTeamData(savedTeam.data);
    setLoadDialogOpen(false);
  };

  const deleteSavedTeam = (id: string) => {
    try {
      const updatedTeams = savedTeams.filter((team) => team.id !== id);
      setSavedTeams(updatedTeams);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTeams));
    } catch (error) {
      console.error("Failed to delete saved team:", error);
    }
  };

  const handleAddPlayer = () => {
    if (!playerName.trim()) return;
    if (teamData.playerPool.includes(playerName.trim())) return;

    setTeamData((prev) => ({
      ...prev,
      playerPool: [...prev.playerPool, playerName.trim()],
    }));
    setPlayerName("");
  };

  const handleRemovePlayer = (name: string) => {
    setTeamData((prev) => ({
      playerPool: prev.playerPool.filter((p) => p !== name),
      teamA: prev.teamA.filter((p) => p !== name),
      teamB: prev.teamB.filter((p) => p !== name),
    }));
  };

  const handleRandomTeams = () => {
    const allPlayers = [
      ...teamData.playerPool,
      ...teamData.teamA,
      ...teamData.teamB,
    ];

    if (allPlayers.length < 2) return;

    const shuffled = [...allPlayers].sort(() => Math.random() - 0.5);
    const mid = Math.ceil(shuffled.length / 2);

    setTeamData({
      playerPool: [],
      teamA: shuffled.slice(0, mid),
      teamB: shuffled.slice(mid),
    });
  };

  const handleResetTeams = () => {
    const allPlayers = [
      ...teamData.playerPool,
      ...teamData.teamA,
      ...teamData.teamB,
    ];
    setTeamData({
      playerPool: allPlayers,
      teamA: [],
      teamB: [],
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // activeId에서 컨테이너와 플레이어 이름 추출
    const [activeContainer, activePlayer] = activeId.split("-");
    const [overContainer] = overId.split("-");

    if (activeContainer === overContainer) return;

    // 플레이어를 새 컨테이너로 이동
    setTeamData((prev) => {
      const newData = { ...prev };

      // 기존 컨테이너에서 제거
      const sourceKey = activeContainer as keyof TeamData;
      newData[sourceKey] = newData[sourceKey].filter((p) => p !== activePlayer);

      // 새 컨테이너에 추가
      const targetKey = overContainer as keyof TeamData;
      newData[targetKey] = [...newData[targetKey], activePlayer];

      return newData;
    });
  };

  const renderPlayerList = (
    players: string[],
    containerId: string,
    title: string,
    color: string
  ) => {
    const items = players.map((player) => `${containerId}-${player}`);

    return (
      <Card
        className={`min-h-80 ${color} border-2 transition-all duration-300 hover:shadow-lg`}
      >
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="min-h-60 p-4 rounded-lg bg-white/10 border-2 border-dashed border-white/30">
              {players.length === 0 ? (
                <div className="flex items-center justify-center h-full text-white/80 text-sm">
                  {containerId === "playerPool"
                    ? "플레이어를 추가해주세요"
                    : "여기로 드래그하세요"}
                </div>
              ) : (
                players.map((player) => (
                  <DraggablePlayer
                    key={`${containerId}-${player}`}
                    id={`${containerId}-${player}`}
                    name={player}
                    containerId={containerId}
                    onRemove={
                      containerId === "playerPool"
                        ? handleRemovePlayer
                        : undefined
                    }
                  />
                ))
              )}
            </div>
          </SortableContext>
        </CardContent>
      </Card>
    );
  };

  const totalPlayers =
    teamData.playerPool.length + teamData.teamA.length + teamData.teamB.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="h-12 w-12 text-white" />
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              히오스 팀 메이커
            </h1>
          </div>
          <p className="text-white/90 text-lg">
            드래그 앤 드롭으로 팀을 구성하세요
          </p>
        </div>

        {/* 플레이어 입력 */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <Input
                placeholder="플레이어 이름"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddPlayer();
                }}
                className="flex-1"
              />
              <Button onClick={handleAddPlayer} className="px-8">
                추가
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 컨트롤 버튼 */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <Button
            onClick={handleRandomTeams}
            disabled={totalPlayers < 2}
            className="bg-green-500 hover:bg-green-600"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            랜덤 팀 생성
          </Button>
          <Button
            variant="outline"
            onClick={handleResetTeams}
            disabled={
              teamData.teamA.length === 0 && teamData.teamB.length === 0
            }
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="h-4 w-4 mr-2" />팀 초기화
          </Button>
          <Button
            variant="outline"
            onClick={() => setSaveDialogOpen(true)}
            disabled={totalPlayers === 0}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Save className="h-4 w-4 mr-2" />
            저장
          </Button>
          <Button
            variant="outline"
            onClick={() => setLoadDialogOpen(true)}
            disabled={savedTeams.length === 0}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Folder className="h-4 w-4 mr-2" />
            불러오기
          </Button>
        </div>

        {/* 드래그 앤 드롭 영역 */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {renderPlayerList(
              teamData.playerPool,
              "playerPool",
              "플레이어 풀",
              "bg-gradient-to-br from-gray-600 to-gray-800"
            )}
            {renderPlayerList(
              teamData.teamA,
              "teamA",
              `팀 A (${teamData.teamA.length}명)`,
              "bg-gradient-to-br from-blue-600 to-blue-800"
            )}
            {renderPlayerList(
              teamData.teamB,
              "teamB",
              `팀 B (${teamData.teamB.length}명)`,
              "bg-gradient-to-br from-red-600 to-red-800"
            )}
          </div>

          <DragOverlay>
            {activeId ? (
              <div className="p-3 rounded-lg bg-white shadow-lg border-2 border-blue-300">
                <span className="font-medium">{activeId.split("-")[1]}</span>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* 팀 구성 완료 표시 */}
        {(teamData.teamA.length > 0 || teamData.teamB.length > 0) && (
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">현재 팀 구성</h3>
              <div className="flex gap-3 flex-wrap">
                <Badge variant="default" className="bg-blue-600">
                  팀 A: {teamData.teamA.length}명
                </Badge>
                <Badge variant="default" className="bg-red-600">
                  팀 B: {teamData.teamB.length}명
                </Badge>
                <Badge variant="secondary">
                  대기: {teamData.playerPool.length}명
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 저장 다이얼로그 */}
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>팀 구성 저장</DialogTitle>
              <DialogDescription>
                현재 팀 구성을 저장할 이름을 입력하세요.
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="저장할 이름"
              value={saveTeamName}
              onChange={(e) => setSaveTeamName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && saveTeamName.trim()) {
                  saveTeamToStorage(saveTeamName.trim());
                }
              }}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSaveDialogOpen(false)}
              >
                취소
              </Button>
              <Button
                onClick={() => saveTeamToStorage(saveTeamName.trim())}
                disabled={!saveTeamName.trim()}
              >
                저장
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 불러오기 다이얼로그 */}
        <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>저장된 팀 불러오기</DialogTitle>
              <DialogDescription>
                불러올 팀 구성을 선택하세요.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              {savedTeams.map((savedTeam) => (
                <div
                  key={savedTeam.id}
                  className="flex items-center justify-between p-4 border rounded-lg mb-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => loadTeamFromStorage(savedTeam)}
                >
                  <div>
                    <h4 className="font-medium">{savedTeam.name}</h4>
                    <p className="text-sm text-gray-600">
                      팀A: {savedTeam.data.teamA.length}명, 팀B:{" "}
                      {savedTeam.data.teamB.length}명, 대기:{" "}
                      {savedTeam.data.playerPool.length}명 |
                      {new Date(savedTeam.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSavedTeam(savedTeam.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setLoadDialogOpen(false)}
              >
                닫기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HotsTeamMaker;
