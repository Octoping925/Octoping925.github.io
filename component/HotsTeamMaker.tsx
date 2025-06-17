import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Fade,
  Slide,
} from "@mui/material";
import {
  Save as SaveIcon,
  Folder as LoadIcon,
  Delete as DeleteIcon,
  Shuffle as ShuffleIcon,
  RestartAlt as ResetIcon,
  SportsEsports as GameIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import dynamic from "next/dynamic";

// react-beautiful-dnd를 동적으로 임포트하여 SSR 문제 해결
const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false },
);

const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false },
);

const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false },
);

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

interface DropResult {
  draggableId: string;
  type: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination?: {
    droppableId: string;
    index: number;
  } | null;
  reason: string;
}

const STORAGE_KEY = "hots-team-maker-data";

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
  const [isClient, setIsClient] = useState(false);
  const [isDragDropReady, setIsDragDropReady] = useState(false);
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [saveTeamName, setSaveTeamName] = useState("");

  // SSR 이슈 해결을 위한 클라이언트 체크
  useEffect(() => {
    setIsClient(true);
    loadSavedTeams();

    // 드래그 앤 드롭 컴포넌트가 로드될 때까지 대기
    const timer = setTimeout(() => {
      setIsDragDropReady(true);
    }, 100);

    return () => clearTimeout(timer);
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
    if (teamData.playerPool.length < 2) return;

    const allPlayers = [
      ...teamData.playerPool,
      ...teamData.teamA,
      ...teamData.teamB,
    ];
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

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const sourceList = teamData[source.droppableId as keyof TeamData];
    const destList = teamData[destination.droppableId as keyof TeamData];

    if (source.droppableId === destination.droppableId) {
      // 같은 리스트 내에서 순서 변경
      const newList = Array.from(sourceList);
      const [removed] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, removed);

      setTeamData((prev) => ({
        ...prev,
        [source.droppableId]: newList,
      }));
    } else {
      // 다른 리스트로 이동
      const newSourceList = Array.from(sourceList);
      const newDestList = Array.from(destList);

      const [removed] = newSourceList.splice(source.index, 1);
      newDestList.splice(destination.index, 0, removed);

      setTeamData((prev) => ({
        ...prev,
        [source.droppableId]: newSourceList,
        [destination.droppableId]: newDestList,
      }));
    }
  };

  const getTeamColor = (droppableId: string) => {
    switch (droppableId) {
      case "teamA":
        return {
          primary: "#1976d2",
          gradient: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
        };
      case "teamB":
        return {
          primary: "#d32f2f",
          gradient: "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
        };
      default:
        return {
          primary: "#757575",
          gradient: "linear-gradient(135deg, #757575 0%, #9e9e9e 100%)",
        };
    }
  };

  const renderPlayerList = (
    players: string[],
    droppableId: string,
    title: string,
  ) => {
    const colors = getTeamColor(droppableId);

    return (
      <Card
        sx={{
          minHeight: 280,
          background: colors.gradient,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          },
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <GroupIcon sx={{ color: "white", fontSize: 24 }} />
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "bold",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {title}
            </Typography>
          </Box>

          {isDragDropReady && (
            <Droppable droppableId={droppableId}>
              {(provided, snapshot) => (
                <List
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    minHeight: 180,
                    backgroundColor: snapshot.isDraggingOver
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    border: snapshot.isDraggingOver
                      ? "2px dashed rgba(255,255,255,0.8)"
                      : "2px dashed rgba(255,255,255,0.3)",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(5px)",
                    p: 1,
                  }}
                >
                  {players.map((name, index) => (
                    <Draggable
                      key={`${droppableId}-${name}-${index}`}
                      draggableId={`${droppableId}-${name}-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Fade in timeout={300 + index * 100}>
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              background: snapshot.isDragging
                                ? "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)"
                                : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
                              mb: 1,
                              borderRadius: 2,
                              border: "1px solid rgba(255,255,255,0.3)",
                              cursor: "grab",
                              transition: "all 0.2s ease",
                              backdropFilter: "blur(10px)",
                              boxShadow: snapshot.isDragging
                                ? "0 8px 25px rgba(0,0,0,0.15)"
                                : "0 2px 8px rgba(0,0,0,0.08)",
                              "&:hover": {
                                background:
                                  "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
                              },
                              "&:active": { cursor: "grabbing" },
                            }}
                            secondaryAction={
                              droppableId === "playerPool" ? (
                                <IconButton
                                  size="small"
                                  onClick={() => handleRemovePlayer(name)}
                                  sx={{
                                    color: "#d32f2f",
                                    "&:hover": {
                                      backgroundColor: "rgba(211, 47, 47, 0.1)",
                                      transform: "scale(1.1)",
                                    },
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              ) : null
                            }
                          >
                            <ListItemText
                              primary={name}
                              sx={{
                                "& .MuiListItemText-primary": {
                                  fontWeight: 600,
                                  color: "#333",
                                  fontSize: "0.95rem",
                                },
                              }}
                            />
                          </ListItem>
                        </Fade>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {players.length === 0 && (
                    <Box
                      sx={{
                        p: 4,
                        textAlign: "center",
                        color: "rgba(255,255,255,0.8)",
                        fontStyle: "italic",
                        fontSize: "0.9rem",
                      }}
                    >
                      {droppableId === "playerPool"
                        ? "플레이어를 추가해주세요"
                        : "여기로 드래그하세요"}
                    </Box>
                  )}
                </List>
              )}
            </Droppable>
          )}

          {!isDragDropReady && (
            <Box
              sx={{
                minHeight: 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.8)",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 2,
                border: "2px dashed rgba(255,255,255,0.3)",
              }}
            >
              <Typography>로딩 중...</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  // SSR 방지
  if (!isClient) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Typography variant="h6" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  const totalPlayers =
    teamData.playerPool.length + teamData.teamA.length + teamData.teamB.length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
      }}
    >
      <Box maxWidth={1200} mx="auto" px={2}>
        <Slide direction="down" in timeout={600}>
          <Box textAlign="center" mb={4}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2}
              mb={2}
            >
              <GameIcon sx={{ fontSize: 48, color: "white" }} />
              <Typography
                variant="h3"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                  background: "linear-gradient(45deg, #fff 30%, #f0f0f0 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                히오스 팀 메이커
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: "rgba(255,255,255,0.9)",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              드래그 앤 드롭으로 팀을 구성하세요
            </Typography>
          </Box>
        </Slide>

        {/* 플레이어 입력 */}
        <Fade in timeout={800}>
          <Card
            sx={{
              mb: 4,
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <TextField
                    label="플레이어 이름"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddPlayer();
                    }}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                          borderColor: "#667eea",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="contained"
                    onClick={handleAddPlayer}
                    fullWidth
                    size="large"
                    sx={{
                      borderRadius: 2,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                      },
                    }}
                  >
                    추가
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>

        {/* 컨트롤 버튼 */}
        <Fade in timeout={1000}>
          <Box
            sx={{
              mb: 4,
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              startIcon={<ShuffleIcon />}
              onClick={handleRandomTeams}
              disabled={totalPlayers < 2}
              size="large"
              sx={{
                borderRadius: 2,
                background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                boxShadow: "0 4px 15px rgba(17, 153, 142, 0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #0e8074 0%, #2dd865 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(17, 153, 142, 0.6)",
                },
                "&:disabled": {
                  background: "rgba(0,0,0,0.12)",
                },
              }}
            >
              랜덤 팀 생성
            </Button>
            <Button
              variant="outlined"
              startIcon={<ResetIcon />}
              onClick={handleResetTeams}
              disabled={
                teamData.teamA.length === 0 && teamData.teamB.length === 0
              }
              size="large"
              sx={{
                borderRadius: 2,
                borderColor: "rgba(255,255,255,0.5)",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              팀 초기화
            </Button>
            <Tooltip title="현재 팀 구성 저장">
              <IconButton
                onClick={() => setSaveDialogOpen(true)}
                disabled={totalPlayers === 0}
                size="large"
                sx={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.3)",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="저장된 팀 불러오기">
              <IconButton
                onClick={() => setLoadDialogOpen(true)}
                disabled={savedTeams.length === 0}
                size="large"
                sx={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.3)",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <LoadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Fade>

        {/* 드래그 앤 드롭 영역 */}
        {isDragDropReady && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Fade in timeout={1200}>
                  <div>
                    {renderPlayerList(
                      teamData.playerPool,
                      "playerPool",
                      "플레이어 풀",
                    )}
                  </div>
                </Fade>
              </Grid>
              <Grid item xs={12} md={4}>
                <Fade in timeout={1400}>
                  <div>
                    {renderPlayerList(
                      teamData.teamA,
                      "teamA",
                      `팀 A (${teamData.teamA.length}명)`,
                    )}
                  </div>
                </Fade>
              </Grid>
              <Grid item xs={12} md={4}>
                <Fade in timeout={1600}>
                  <div>
                    {renderPlayerList(
                      teamData.teamB,
                      "teamB",
                      `팀 B (${teamData.teamB.length}명)`,
                    )}
                  </div>
                </Fade>
              </Grid>
            </Grid>
          </DragDropContext>
        )}

        {!isDragDropReady && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Fade in timeout={1200}>
                <div>
                  {renderPlayerList(
                    teamData.playerPool,
                    "playerPool",
                    "플레이어 풀",
                  )}
                </div>
              </Fade>
            </Grid>
            <Grid item xs={12} md={4}>
              <Fade in timeout={1400}>
                <div>
                  {renderPlayerList(
                    teamData.teamA,
                    "teamA",
                    `팀 A (${teamData.teamA.length}명)`,
                  )}
                </div>
              </Fade>
            </Grid>
            <Grid item xs={12} md={4}>
              <Fade in timeout={1600}>
                <div>
                  {renderPlayerList(
                    teamData.teamB,
                    "teamB",
                    `팀 B (${teamData.teamB.length}명)`,
                  )}
                </div>
              </Fade>
            </Grid>
          </Grid>
        )}

        {/* 팀 구성 완료 표시 */}
        {(teamData.teamA.length > 0 || teamData.teamB.length > 0) && (
          <Fade in timeout={1800}>
            <Card
              sx={{
                mt: 4,
                borderRadius: 3,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  현재 팀 구성
                </Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Chip
                    label={`팀 A: ${teamData.teamA.length}명`}
                    sx={{
                      background:
                        "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                      color: "white",
                      fontWeight: "bold",
                      boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
                    }}
                  />
                  <Chip
                    label={`팀 B: ${teamData.teamB.length}명`}
                    sx={{
                      background:
                        "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
                      color: "white",
                      fontWeight: "bold",
                      boxShadow: "0 2px 8px rgba(211, 47, 47, 0.3)",
                    }}
                  />
                  <Chip
                    label={`대기: ${teamData.playerPool.length}명`}
                    sx={{
                      background:
                        "linear-gradient(135deg, #757575 0%, #9e9e9e 100%)",
                      color: "white",
                      fontWeight: "bold",
                      boxShadow: "0 2px 8px rgba(117, 117, 117, 0.3)",
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Fade>
        )}

        {/* 저장 다이얼로그 */}
        <Dialog
          open={saveDialogOpen}
          onClose={() => setSaveDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>팀 구성 저장</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="저장할 이름"
              fullWidth
              variant="outlined"
              value={saveTeamName}
              onChange={(e) => setSaveTeamName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && saveTeamName.trim()) {
                  saveTeamToStorage(saveTeamName.trim());
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setSaveDialogOpen(false)}>취소</Button>
            <Button
              onClick={() => saveTeamToStorage(saveTeamName.trim())}
              disabled={!saveTeamName.trim()}
              variant="contained"
              sx={{
                borderRadius: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              저장
            </Button>
          </DialogActions>
        </Dialog>

        {/* 불러오기 다이얼로그 */}
        <Dialog
          open={loadDialogOpen}
          onClose={() => setLoadDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>
            저장된 팀 불러오기
          </DialogTitle>
          <DialogContent>
            <List>
              {savedTeams.map((savedTeam) => (
                <ListItem
                  key={savedTeam.id}
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    mb: 1,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                  secondaryAction={
                    <IconButton
                      onClick={() => deleteSavedTeam(savedTeam.id)}
                      sx={{
                        color: "#d32f2f",
                        "&:hover": {
                          backgroundColor: "rgba(211, 47, 47, 0.1)",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={savedTeam.name}
                    secondary={`팀A: ${savedTeam.data.teamA.length}명, 팀B: ${
                      savedTeam.data.teamB.length
                    }명, 대기: ${
                      savedTeam.data.playerPool.length
                    }명 | ${new Date(savedTeam.createdAt).toLocaleString()}`}
                    onClick={() => loadTeamFromStorage(savedTeam)}
                    sx={{ cursor: "pointer" }}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setLoadDialogOpen(false)}>닫기</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default HotsTeamMaker;
