import { CARD, COLORS, FONTS } from './config';

/**
 * The isometric UI card. A glass slab with mock Chugnus UI rendered on its face.
 * This component is pure visual — camera transforms are applied by the parent CameraRig.
 *
 * The card shows a simplified but recognizable version of the Chugnus UI:
 * - Left sidebar with tab navigation
 * - Main content area showing the "active" tab
 *
 * activeRegion highlights which tab section the camera is currently zoomed into.
 */
export const IsometricCard: React.FC<{
  activeRegion: string | null;
  energy: number;
  frame: number;
}> = ({ activeRegion, energy, frame }) => {
  const glowIntensity = 0.1 + energy * 0.12;

  return (
    <div
      style={{
        width: CARD.width,
        height: CARD.height,
        position: 'relative',
        borderRadius: CARD.cornerRadius,
        background: COLORS.surface1,
        boxShadow: `
          0 0 ${40 + energy * 60}px rgba(108,142,239,${glowIntensity}),
          0 30px 80px rgba(0,0,0,0.6),
          inset 0 1px 0 rgba(255,255,255,0.06)
        `,
        border: `1px solid rgba(108,142,239,${CARD.edgeGlowOpacity + energy * 0.08})`,
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <Sidebar activeRegion={activeRegion} />

      {/* Main content area */}
      <div style={{ position: 'absolute', left: 160, top: 0, right: 0, bottom: 0 }}>
        <CommandCenterView visible={!activeRegion || activeRegion === 'command_center'} frame={frame} energy={energy} />
        <AgentsView visible={activeRegion === 'agents'} frame={frame} energy={energy} />
        <SessionsView visible={activeRegion === 'sessions'} frame={frame} energy={energy} />
        <MemoriesView visible={activeRegion === 'memories'} frame={frame} energy={energy} />
        <ContextQueryView visible={activeRegion === 'context_query'} frame={frame} energy={energy} />
        <KanbanView visible={activeRegion === 'kanban'} frame={frame} energy={energy} />
      </div>

      {/* Glass reflection overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)',
          borderRadius: CARD.cornerRadius,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

// ─── SIDEBAR ───────────────────────────────────────────
const Sidebar: React.FC<{ activeRegion: string | null }> = ({ activeRegion }) => {
  const tabs = [
    { id: 'command_center', label: 'Command', icon: '⚡', group: 'Command' },
    { id: 'agents', label: 'Agents', icon: '🤖', group: 'AI & Knowledge' },
    { id: 'memories', label: 'Memories', icon: '🧠', group: 'AI & Knowledge' },
    { id: 'sessions', label: 'Sessions', icon: '📊', group: 'AI & Knowledge' },
    { id: 'context_query', label: 'Context', icon: '🔍', group: 'AI & Knowledge' },
    { id: 'kanban', label: 'Lab', icon: '🧪', group: 'AI & Knowledge' },
    { id: 'settings', label: 'Settings', icon: '⚙️', group: 'Settings' },
  ];

  let lastGroup = '';

  return (
    <div
      style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: 160,
        background: COLORS.bg,
        borderRight: `1px solid ${COLORS.subtle}`,
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {/* App title */}
      <div style={{
        padding: '0 12px 12px',
        fontFamily: FONTS.display,
        fontSize: 13,
        fontWeight: 700,
        color: COLORS.white95,
        letterSpacing: '0.02em',
      }}>
        Chugnus
      </div>

      {tabs.map((tab) => {
        const showGroup = tab.group !== lastGroup;
        lastGroup = tab.group;
        const isActive = activeRegion === tab.id || (!activeRegion && tab.id === 'command_center');

        return (
          <div key={tab.id}>
            {showGroup && (
              <div style={{
                padding: '8px 12px 4px',
                fontFamily: FONTS.body,
                fontSize: 9,
                color: COLORS.muted,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                {tab.group}
              </div>
            )}
            <div style={{
              padding: '6px 12px',
              fontFamily: FONTS.body,
              fontSize: 11,
              color: isActive ? COLORS.white95 : COLORS.muted,
              background: isActive ? 'rgba(108,142,239,0.1)' : 'transparent',
              borderLeft: isActive ? `2px solid ${COLORS.blue}` : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ fontSize: 12 }}>{tab.icon}</span>
              {tab.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── TAB VIEWS ─────────────────────────────────────────
const ViewContainer: React.FC<{
  visible: boolean;
  children: React.ReactNode;
}> = ({ visible, children }) => (
  <div style={{
    position: 'absolute',
    inset: 0,
    padding: 20,
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
    overflow: 'hidden',
  }}>
    {children}
  </div>
);

// Command Center — task queue with status pills
const CommandCenterView: React.FC<{ visible: boolean; frame: number; energy: number }> = ({ visible, frame, energy }) => (
  <ViewContainer visible={visible}>
    <div style={{ fontFamily: FONTS.hero, fontSize: 14, color: COLORS.white95, marginBottom: 16, letterSpacing: '0.04em' }}>
      Command Center
    </div>
    {['Refactor auth module', 'Write test suite', 'Deploy staging build'].map((task, i) => (
      <TaskCard
        key={task}
        title={task}
        status={i === 0 ? 'working' : i === 1 ? 'awaiting' : 'queued'}
        frame={frame}
        index={i}
      />
    ))}
  </ViewContainer>
);

const TaskCard: React.FC<{
  title: string;
  status: 'working' | 'awaiting' | 'queued';
  frame: number;
  index: number;
}> = ({ title, status, frame, index }) => {
  const statusColors: Record<string, string> = {
    working: COLORS.emerald,
    awaiting: COLORS.amber,
    queued: COLORS.muted,
  };

  const pulseOpacity = status === 'working'
    ? 0.8 + Math.sin(frame * 0.08) * 0.2
    : 1;

  return (
    <div style={{
      background: COLORS.surface2,
      borderRadius: 8,
      padding: '10px 14px',
      marginBottom: 8,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      border: `1px solid ${COLORS.subtle}`,
    }}>
      <div style={{
        width: 8, height: 8,
        borderRadius: '50%',
        background: statusColors[status],
        opacity: pulseOpacity,
        boxShadow: status === 'working' ? `0 0 8px ${COLORS.emerald}` : 'none',
      }} />
      <div style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.white95 }}>{title}</div>
      <div style={{
        marginLeft: 'auto',
        fontFamily: FONTS.hero,
        fontSize: 9,
        color: statusColors[status],
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        {status}
      </div>
    </div>
  );
};

// Agents — cards with pulsing dots and stats
const AgentsView: React.FC<{ visible: boolean; frame: number; energy: number }> = ({ visible, frame, energy }) => (
  <ViewContainer visible={visible}>
    <div style={{ fontFamily: FONTS.hero, fontSize: 14, color: COLORS.white95, marginBottom: 16, letterSpacing: '0.04em' }}>
      Agents
    </div>
    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
      {[
        { name: 'code-reviewer', status: 'running', color: COLORS.emerald },
        { name: 'test-runner', status: 'idle', color: COLORS.blue },
        { name: 'researcher', status: 'paused', color: COLORS.amber },
      ].map((agent) => (
        <div key={agent.name} style={{
          flex: 1,
          background: COLORS.surface2,
          borderRadius: 10,
          padding: 12,
          border: `1px solid ${COLORS.subtle}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: agent.color,
              opacity: agent.status === 'running' ? 0.8 + Math.sin(frame * 0.1) * 0.2 : 0.6,
              boxShadow: agent.status === 'running' ? `0 0 6px ${agent.color}` : 'none',
            }} />
            <div style={{ fontFamily: FONTS.hero, fontSize: 10, color: COLORS.white95 }}>{agent.name}</div>
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: 9, color: COLORS.muted }}>{agent.status}</div>
        </div>
      ))}
    </div>
    {/* Stats row */}
    <div style={{ display: 'flex', gap: 16 }}>
      {[
        { label: 'Total Runs', value: '47' },
        { label: 'Success', value: '94%' },
        { label: 'Spend', value: '$12.40' },
      ].map((stat) => (
        <div key={stat.label} style={{ fontFamily: FONTS.hero, fontSize: 10, color: COLORS.muted }}>
          <div style={{ fontSize: 20, color: COLORS.white95, marginBottom: 2 }}>{stat.value}</div>
          {stat.label}
        </div>
      ))}
    </div>
  </ViewContainer>
);

// Sessions — heatmap + tool bars
const SessionsView: React.FC<{ visible: boolean; frame: number; energy: number }> = ({ visible, frame, energy }) => (
  <ViewContainer visible={visible}>
    <div style={{ fontFamily: FONTS.hero, fontSize: 14, color: COLORS.white95, marginBottom: 16, letterSpacing: '0.04em' }}>
      Sessions
    </div>
    {/* Mini heatmap — deterministic pattern (no Math.random) */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: 3, marginBottom: 16 }}>
      {Array.from({ length: 70 }, (_, i) => {
        // Seeded hash for stable per-cell intensity
        const seed = ((i * 2654435761) >>> 0) / 4294967296;
        const intensity = seed;
        return (
          <div
            key={i}
            style={{
              width: '100%',
              aspectRatio: '1',
              borderRadius: 2,
              background: intensity > 0.7
                ? COLORS.blue
                : intensity > 0.4
                  ? 'rgba(108,142,239,0.4)'
                  : intensity > 0.15
                    ? 'rgba(108,142,239,0.15)'
                    : COLORS.surface3,
            }}
          />
        );
      })}
    </div>
    {/* Tool bars */}
    {['Read (312)', 'Bash (198)', 'Edit (147)', 'Grep (89)'].map((tool, i) => (
      <div key={tool} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <div style={{ fontFamily: FONTS.hero, fontSize: 9, color: COLORS.muted, width: 80 }}>{tool}</div>
        <div style={{
          height: 8, borderRadius: 4,
          background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.purple})`,
          width: `${[80, 55, 40, 25][i]}%`,
          opacity: 0.8,
        }} />
      </div>
    ))}
  </ViewContainer>
);

// Memories — cards with topic tags
const MemoriesView: React.FC<{ visible: boolean; frame: number; energy: number }> = ({ visible, frame, energy }) => (
  <ViewContainer visible={visible}>
    <div style={{ fontFamily: FONTS.hero, fontSize: 14, color: COLORS.white95, marginBottom: 16, letterSpacing: '0.04em' }}>
      Memories
    </div>
    {[
      { title: 'Zustand store patterns', topic: 'projects', color: COLORS.blue, importance: 3 },
      { title: 'Vitest mock strategies', topic: 'learning', color: COLORS.emerald, importance: 2 },
      { title: 'SQLite WAL mode gotchas', topic: 'learning', color: COLORS.emerald, importance: 2 },
      { title: 'Electron IPC best practices', topic: 'projects', color: COLORS.blue, importance: 1 },
    ].map((mem) => (
      <div key={mem.title} style={{
        background: COLORS.surface2,
        borderRadius: 8,
        padding: '10px 14px',
        marginBottom: 8,
        border: `1px solid ${COLORS.subtle}`,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.white95, marginBottom: 4 }}>{mem.title}</div>
          <div style={{
            display: 'inline-block',
            fontFamily: FONTS.hero, fontSize: 8,
            color: mem.color,
            background: `${mem.color}20`,
            padding: '2px 6px',
            borderRadius: 4,
          }}>
            {mem.topic}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} style={{
              width: 5, height: 5, borderRadius: '50%',
              background: i < mem.importance ? COLORS.amber : COLORS.surface3,
            }} />
          ))}
        </div>
      </div>
    ))}
  </ViewContainer>
);

// Context / Smart Query — search bar + response
const ContextQueryView: React.FC<{ visible: boolean; frame: number; energy: number }> = ({ visible, frame, energy }) => (
  <ViewContainer visible={visible}>
    <div style={{ fontFamily: FONTS.hero, fontSize: 14, color: COLORS.white95, marginBottom: 16, letterSpacing: '0.04em' }}>
      Smart Query
    </div>
    {/* Search bar */}
    <div style={{
      background: COLORS.surface2,
      borderRadius: 8,
      padding: '10px 14px',
      marginBottom: 16,
      border: `1px solid ${COLORS.blue}40`,
      fontFamily: FONTS.hero,
      fontSize: 11,
      color: COLORS.white70,
    }}>
      How do my agents handle errors?
    </div>
    {/* Response */}
    <div style={{
      background: COLORS.surface2,
      borderRadius: 8,
      padding: 14,
      border: `1px solid ${COLORS.subtle}`,
      fontFamily: FONTS.body,
      fontSize: 10,
      color: COLORS.white70,
      lineHeight: 1.6,
    }}>
      Based on your session data, agents use a retry-with-backoff pattern.
      The code-reviewer agent catches errors in the review loop and retries
      up to 3 times with exponential delay...
      <div style={{ marginTop: 8, fontFamily: FONTS.hero, fontSize: 8, color: COLORS.muted }}>
        Sources: session-2024-03-15.json, agents-config.md
      </div>
    </div>
  </ViewContainer>
);

// Kanban — drag-drop board
const KanbanView: React.FC<{ visible: boolean; frame: number; energy: number }> = ({ visible, frame, energy }) => {
  const columns = [
    { name: 'Backlog', cards: ['Auth refactor'] },
    { name: 'In Progress', cards: ['API endpoints', 'DB migration'] },
    { name: 'Review', cards: ['UI polish'] },
    { name: 'Done', cards: ['Setup CI', 'Init repo'] },
  ];

  return (
    <ViewContainer visible={visible}>
      <div style={{ fontFamily: FONTS.hero, fontSize: 14, color: COLORS.white95, marginBottom: 16, letterSpacing: '0.04em' }}>
        Issues Board
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {columns.map((col) => (
          <div key={col.name} style={{ flex: 1 }}>
            <div style={{
              fontFamily: FONTS.hero, fontSize: 9, color: COLORS.muted,
              marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {col.name}
              <span style={{
                background: COLORS.surface3,
                borderRadius: 8,
                padding: '1px 5px',
                fontSize: 8,
              }}>
                {col.cards.length}
              </span>
            </div>
            {col.cards.map((card) => (
              <div key={card} style={{
                background: COLORS.surface2,
                borderRadius: 6,
                padding: '8px 10px',
                marginBottom: 6,
                fontFamily: FONTS.body,
                fontSize: 10,
                color: COLORS.white95,
                border: `1px solid ${COLORS.subtle}`,
              }}>
                {card}
              </div>
            ))}
          </div>
        ))}
      </div>
    </ViewContainer>
  );
};
