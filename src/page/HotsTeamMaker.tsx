import { useState, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { Draggable } from "../components/Draggable";
import { Droppable } from "../components/Droppable";
import { X } from "lucide-react";

interface Player {
  id: string;
  name: string;
}

interface TeamState {
  playerPool: Player[];
  teamA: Player[];
  teamB: Player[];
}

const STORAGE_KEY = "hots-team-maker-state";

const saveToLocalStorage = (state: TeamState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const loadFromLocalStorage = (): TeamState | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch (e) {
    console.error("Failed to load state from localStorage:", e);
    return null;
  }
};

const HotsTeamMaker = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [playerPool, setPlayerPool] = useState<Player[]>([]);
  const [teamA, setTeamA] = useState<Player[]>([]);
  const [teamB, setTeamB] = useState<Player[]>([]);

  // 초기 상태 로드
  useEffect(() => {
    const savedState = loadFromLocalStorage();
    if (savedState) {
      setPlayerPool(savedState.playerPool);
      setTeamA(savedState.teamA);
      setTeamB(savedState.teamB);
    }
  }, []);

  // 상태 변경시 저장
  useEffect(() => {
    if (playerPool.length === 0 && teamA.length === 0 && teamB.length === 0)
      return;

    saveToLocalStorage({
      playerPool,
      teamA,
      teamB,
    });
  }, [playerPool, teamA, teamB]);

  const handleAddPlayer = () => {
    if (!playerName.trim()) return;

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: playerName.trim(),
    };

    setPlayerPool([...playerPool, newPlayer]);
    setPlayerName("");
  };

  const handleDefaultTeam = () => {
    setPlayerPool([
      { id: "1", name: "김성봉" },
      { id: "2", name: "정시욱" },
      { id: "3", name: "문영채" },
      { id: "4", name: "정재윤" },
      { id: "5", name: "김수진" },
      { id: "6", name: "엄소현" },
      { id: "7", name: "이민행" },
      { id: "8", name: "채수관" },
      { id: "9", name: "이훈규" },
      { id: "10", name: "윤호영" },
    ]);
    setTeamA([]);
    setTeamB([]);
  };

  const handleRemovePlayer = (playerId: string, team: "pool" | "A" | "B") => {
    switch (team) {
      case "pool":
        setPlayerPool((prev) => prev.filter((p) => p.id !== playerId));
        break;
      case "A":
        setTeamA((prev) => prev.filter((p) => p.id !== playerId));
        break;
      case "B":
        setTeamB((prev) => prev.filter((p) => p.id !== playerId));
        break;
    }
  };

  const handleDrop = (playerId: string, targetTeam: "pool" | "A" | "B") => {
    let player: Player | undefined;
    let setSourceTeam:
      | React.Dispatch<React.SetStateAction<Player[]>>
      | undefined;

    // 플레이어를 찾고 원래 팀에서 제거
    [playerPool, teamA, teamB].forEach((team, index) => {
      const found = team.find((p) => p.id === playerId);
      if (found) {
        player = found;
        setSourceTeam = [setPlayerPool, setTeamA, setTeamB][index];
      }
    });

    if (!player || !setSourceTeam) return;

    // 원래 팀에서 제거
    setSourceTeam((prev) => prev.filter((p) => p.id !== playerId));

    // 새로운 팀에 추가
    switch (targetTeam) {
      case "pool":
        setPlayerPool((prev) => [...prev, player!]);
        break;
      case "A":
        setTeamA((prev) => [...prev, player!]);
        break;
      case "B":
        setTeamB((prev) => [...prev, player!]);
        break;
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddPlayer();
    }
  };

  const PlayerCard = ({
    player,
    team,
  }: {
    player: Player;
    team: "pool" | "A" | "B";
  }) => (
    <Draggable key={player.id} id={player.id}>
      <div
        className={`
        group relative p-3 rounded-lg shadow-lg cursor-move border flex items-center justify-between
      bg-gray-700 hover:bg-gray-600 border-gray-600
      `}
      >
        {player.name}
        <button
          className="rounded-2xl p-1 w-fit h-fit"
          onClick={() => handleRemovePlayer(player.id, team)}
        >
          <X className="w-4 h-4 text-white-400" />
        </button>
      </div>
    </Draggable>
  );

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          내전 팀 메이커
        </h1>

        <div className="mb-8 flex gap-4 justify-center">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="플레이어 이름 입력"
            className="bg-gray-800 border-2 border-gray-700 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors w-64 text-gray-100 placeholder-gray-500"
          />
          <button
            onClick={handleAddPlayer}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            추가
          </button>
          <button
            onClick={handleDefaultTeam}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            기본 팀 설정
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Droppable
            onDrop={(id) => handleDrop(id, "pool")}
            className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700 min-h-[800px]"
          >
            <h2 className="font-bold text-xl mb-4 text-gray-300">
              플레이어 풀
            </h2>
            <div className="space-y-2">
              {playerPool.map((player) => (
                <PlayerCard key={player.id} player={player} team="pool" />
              ))}
            </div>
          </Droppable>

          <Droppable
            onDrop={(id) => handleDrop(id, "A")}
            className="bg-blue-900/30 p-6 rounded-xl border-2 border-blue-800 min-h-[800px]"
          >
            <h2 className="font-bold text-xl mb-4 text-blue-300">팀 A</h2>
            <div className="space-y-2">
              {teamA.map((player) => (
                <PlayerCard key={player.id} player={player} team="A" />
              ))}
            </div>
          </Droppable>

          <Droppable
            onDrop={(id) => handleDrop(id, "B")}
            className="bg-purple-900/30 p-6 rounded-xl border-2 border-purple-800 min-h-[800px]"
          >
            <h2 className="font-bold text-xl mb-4 text-purple-300">팀 B</h2>
            <div className="space-y-2">
              {teamB.map((player) => (
                <PlayerCard key={player.id} player={player} team="B" />
              ))}
            </div>
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default HotsTeamMaker;
