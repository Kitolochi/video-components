import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

/**
 * Isometric Variations — Diverse Camera Angles with Scrolling UI
 *
 * 12 different shots (2s each, 24s total):
 * - Each shot showcases actual UI content with scrolling animations
 * - Different camera angles, zoom levels, and movements
 * - Real interface elements (dashboards, lists, grids, forms)
 *
 * 60fps-ready: All timing uses fps parameter.
 * Duration: 24s (1440 frames at 60fps)
 */

export const IsometricVariations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a0a2e 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Shot 1: Dashboard with Vertical Scroll (0-2s) */}
      <Sequence from={0} durationInFrames={fps * 2}>
        <DashboardScroll frame={frame} fps={fps} />
      </Sequence>

      {/* Shot 2: Project Cards Grid Zoom (2-4s) */}
      <Sequence from={fps * 2} durationInFrames={fps * 2}>
        <ProjectCardsZoom frame={frame - fps * 2} fps={fps} />
      </Sequence>

      {/* Shot 3: Analytics Dashboard Dutch Angle (4-6s) */}
      <Sequence from={fps * 4} durationInFrames={fps * 2}>
        <AnalyticsDutch frame={frame - fps * 4} fps={fps} />
      </Sequence>

      {/* Shot 4: Task List Scroll + Zoom Punch (6-8s) */}
      <Sequence from={fps * 6} durationInFrames={fps * 2}>
        <TaskListZoomPunch frame={frame - fps * 6} fps={fps} />
      </Sequence>

      {/* Shot 5: Email Inbox Corner Focus (8-10s) */}
      <Sequence from={fps * 8} durationInFrames={fps * 2}>
        <EmailCornerFocus frame={frame - fps * 8} fps={fps} />
      </Sequence>

      {/* Shot 6: Calendar Slow Rotation (10-12s) */}
      <Sequence from={fps * 10} durationInFrames={fps * 2}>
        <CalendarRotation frame={frame - fps * 10} fps={fps} />
      </Sequence>

      {/* Shot 7: Settings Panel Split-Screen (12-14s) */}
      <Sequence from={fps * 12} durationInFrames={fps * 2}>
        <SettingsSplitScreen frame={frame - fps * 12} fps={fps} />
      </Sequence>

      {/* Shot 8: Data Table Microscopic Zoom (14-16s) */}
      <Sequence from={fps * 14} durationInFrames={fps * 2}>
        <DataTableMicroscopic frame={frame - fps * 14} fps={fps} />
      </Sequence>

      {/* Shot 9: Dashboard Grid Bird's Eye (16-18s) */}
      <Sequence from={fps * 16} durationInFrames={fps * 2}>
        <DashboardBirdsEye frame={frame - fps * 16} fps={fps} />
      </Sequence>

      {/* Shot 10: Form Fields Cinema Letterbox (18-20s) */}
      <Sequence from={fps * 18} durationInFrames={fps * 2}>
        <FormLetterbox frame={frame - fps * 18} fps={fps} />
      </Sequence>

      {/* Shot 11: Multi-Window Grid Array (20-22s) */}
      <Sequence from={fps * 20} durationInFrames={fps * 2}>
        <MultiWindowGrid frame={frame - fps * 20} fps={fps} />
      </Sequence>

      {/* Shot 12: Hero Dashboard Hero Slam (22-24s) */}
      <Sequence from={fps * 22} durationInFrames={fps * 2}>
        <HeroDashboardSlam frame={frame - fps * 22} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// Shot 1: Dashboard with Vertical Scroll - Extreme Close-Up
const DashboardScroll: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(progress, [0, 1], [3.0, 3.5]);
  const scrollY = interpolate(progress, [0, 1], [0, -200]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const metrics = [
    { label: 'Active Users', value: '12,458', trend: '+12%' },
    { label: 'Revenue', value: '$48.2K', trend: '+8%' },
    { label: 'Conversion', value: '3.24%', trend: '+0.4%' },
    { label: 'Avg Session', value: '8m 42s', trend: '-2%' },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) rotateX(-15deg) rotateY(-20deg) translate(-25%, -15%)`,
            transformStyle: 'preserve-3d',
            width: '700px',
            height: '500px',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(0, 217, 255, 0.4)',
            boxShadow: '0 40px 100px rgba(0, 0, 0, 0.8), 0 0 60px rgba(0, 217, 255, 0.2)',
            padding: '40px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div style={{ transform: `translateY(${scrollY}px)` }}>
            <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '36px', fontWeight: 700, marginBottom: '30px' }}>
              Analytics Dashboard
            </div>
            {metrics.map((metric, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(0, 217, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '24px',
                  marginBottom: '16px',
                  border: '1px solid rgba(0, 217, 255, 0.2)',
                }}
              >
                <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '8px' }}>
                  {metric.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '32px', fontWeight: 700 }}>
                    {metric.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      color: metric.trend.startsWith('+') ? '#10b981' : '#ef4444',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                  >
                    {metric.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 2: Project Cards Grid with Zoom In
const ProjectCardsZoom: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(progress, [0, 1], [0.85, 1.0]);
  const rotateX = interpolate(progress, [0, 1], [-25, -18]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const projects = [
    { name: 'Marketing Site', status: 'In Progress', color: '#3b82f6' },
    { name: 'Mobile App', status: 'Review', color: '#8b5cf6' },
    { name: 'Dashboard v2', status: 'Completed', color: '#10b981' },
    { name: 'API Gateway', status: 'Planning', color: '#f59e0b' },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) rotateX(${rotateX}deg) rotateY(-5deg)`,
            transformStyle: 'preserve-3d',
            width: '950px',
            height: '650px',
            background: 'linear-gradient(135deg, #2d1b4e 0%, #5a2d7a 100%)',
            borderRadius: '24px',
            border: '2px solid rgba(217, 70, 239, 0.3)',
            boxShadow: '0 60px 120px rgba(0, 0, 0, 0.8)',
            padding: '50px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '40px' }}>
            Active Projects
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {projects.map((project, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '32px',
                  border: `2px solid ${project.color}40`,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: project.color,
                    position: 'absolute',
                    top: '32px',
                    right: '32px',
                  }}
                />
                <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>
                  {project.name}
                </div>
                <div style={{ fontFamily: 'Inter', color: project.color, fontSize: '14px', fontWeight: 500 }}>
                  {project.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 3: Analytics Dashboard with Dutch Angle
const AnalyticsDutch: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 180 } });
  const rotateZ = interpolate(progress, [0, 1], [-18, -12]);
  const scrollX = interpolate(progress, [0, 1], [0, -180]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const chartBars = [0.6, 0.85, 0.45, 0.92, 0.7, 0.55, 0.88, 0.65];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `rotateX(-20deg) rotateY(15deg) rotateZ(${rotateZ}deg)`,
            transformStyle: 'preserve-3d',
            width: '1000px',
            height: '600px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '24px',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 50px 100px rgba(0, 0, 0, 0.9)',
            padding: '50px',
            overflow: 'hidden',
          }}
        >
          <div style={{ transform: `translateX(${scrollX}px)` }}>
            <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '42px', fontWeight: 700, marginBottom: '10px' }}>
              Performance Metrics
            </div>
            <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '40px' }}>
              Last 7 days
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', height: '350px' }}>
              {chartBars.map((height, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '60px',
                      height: `${height * 300}px`,
                      background: `linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)`,
                      borderRadius: '8px 8px 0 0',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
                    }}
                  />
                  <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                    Day {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 4: Task List with Zoom Punch + Scroll
const TaskListZoomPunch: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(progress, [0, 1], [2.2, 1.0]);
  const scrollY = interpolate(progress, [0, 1], [0, -100]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const tasks = [
    { title: 'Design system updates', status: 'completed', priority: 'high' },
    { title: 'API integration testing', status: 'in-progress', priority: 'high' },
    { title: 'User feedback review', status: 'todo', priority: 'medium' },
    { title: 'Documentation updates', status: 'todo', priority: 'low' },
    { title: 'Performance optimization', status: 'in-progress', priority: 'high' },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) rotateX(-18deg) rotateY(-8deg)`,
            transformStyle: 'preserve-3d',
            width: '800px',
            height: '600px',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(139, 92, 246, 0.4)',
            boxShadow: '0 50px 100px rgba(0, 0, 0, 0.8), 0 0 60px rgba(139, 92, 246, 0.2)',
            padding: '40px',
            overflow: 'hidden',
          }}
        >
          <div style={{ transform: `translateY(${scrollY}px)` }}>
            <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '38px', fontWeight: 700, marginBottom: '30px' }}>
              Task Queue
            </div>
            {tasks.map((task, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(139, 92, 246, 0.08)',
                  borderRadius: '12px',
                  padding: '20px 24px',
                  marginBottom: '12px',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: task.status === 'completed' ? '2px solid #10b981' : '2px solid rgba(255,255,255,0.3)',
                    background: task.status === 'completed' ? '#10b981' : 'transparent',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '18px', fontWeight: 500 }}>
                    {task.title}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'Inter',
                    color:
                      task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#6b7280',
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {task.priority}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 5: Email Inbox Corner Focus
const EmailCornerFocus: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const rotateY = interpolate(progress, [0, 1], [-35, -28]);
  const scrollY = interpolate(progress, [0, 1], [0, -120]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const emails = [
    { from: 'Sarah Chen', subject: 'Q4 Review Meeting', time: '2m ago', unread: true },
    { from: 'Product Team', subject: 'New feature rollout', time: '1h ago', unread: true },
    { from: 'Alex Rivera', subject: 'Design feedback', time: '3h ago', unread: false },
    { from: 'Finance Dept', subject: 'Budget approval', time: '5h ago', unread: false },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `rotateX(-22deg) rotateY(${rotateY}deg) translate(20%, -10%)`,
            transformStyle: 'preserve-3d',
            width: '750px',
            height: '550px',
            background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(244, 63, 94, 0.3)',
            boxShadow: '0 50px 100px rgba(0, 0, 0, 0.8)',
            padding: '40px',
            overflow: 'hidden',
          }}
        >
          <div style={{ transform: `translateY(${scrollY}px)` }}>
            <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '36px', fontWeight: 700, marginBottom: '30px' }}>
              Inbox
            </div>
            {emails.map((email, i) => (
              <div
                key={i}
                style={{
                  background: email.unread ? 'rgba(244, 63, 94, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '12px',
                  padding: '20px 24px',
                  marginBottom: '12px',
                  border: email.unread ? '1px solid rgba(244, 63, 94, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '16px', fontWeight: email.unread ? 700 : 500 }}>
                    {email.from}
                  </div>
                  <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
                    {email.time}
                  </div>
                </div>
                <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                  {email.subject}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 6: Calendar with Slow Rotation
const CalendarRotation: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 180 } });
  const rotateY = interpolate(progress, [0, 1], [-10, 10]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const events = [
    { time: '9:00 AM', title: 'Team Standup', color: '#3b82f6' },
    { time: '11:00 AM', title: 'Design Review', color: '#8b5cf6' },
    { time: '2:00 PM', title: 'Client Call', color: '#ef4444' },
    { time: '4:00 PM', title: 'Sprint Planning', color: '#10b981' },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `rotateX(-15deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
            width: '850px',
            height: '600px',
            background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 100%)',
            borderRadius: '24px',
            border: '2px solid rgba(14, 165, 233, 0.3)',
            boxShadow: '0 60px 120px rgba(0, 0, 0, 0.8)',
            padding: '50px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '42px', fontWeight: 700, marginBottom: '10px' }}>
            Today's Schedule
          </div>
          <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '40px' }}>
            Monday, March 17
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {events.map((event, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.5)', fontSize: '18px', width: '100px' }}>
                  {event.time}
                </div>
                <div
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '24px',
                    borderLeft: `4px solid ${event.color}`,
                  }}
                >
                  <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '20px', fontWeight: 600 }}>
                    {event.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 7: Settings Panel Split-Screen
const SettingsSplitScreen: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const settings = [
    { category: 'Profile', items: ['Name', 'Email', 'Avatar'] },
    { category: 'Security', items: ['Password', '2FA', 'Sessions'] },
    { category: 'Notifications', items: ['Email', 'Push', 'SMS'] },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        {/* Left View */}
        <div
          style={{
            transform: 'rotateX(-20deg) rotateY(25deg)',
            transformStyle: 'preserve-3d',
            width: '500px',
            height: '600px',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(0, 217, 255, 0.3)',
            boxShadow: '0 50px 100px rgba(0, 0, 0, 0.8)',
            padding: '40px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '32px', fontWeight: 700, marginBottom: '30px' }}>
            Settings
          </div>
          {settings.map((section, i) => (
            <div key={i} style={{ marginBottom: '30px' }}>
              <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '12px' }}>
                {section.category}
              </div>
              {section.items.map((item, j) => (
                <div
                  key={j}
                  style={{
                    fontFamily: 'Inter',
                    color: 'white',
                    fontSize: '16px',
                    padding: '12px 16px',
                    background: 'rgba(0, 217, 255, 0.05)',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    border: '1px solid rgba(0, 217, 255, 0.1)',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Right View */}
        <div
          style={{
            transform: 'rotateX(-20deg) rotateY(-25deg)',
            transformStyle: 'preserve-3d',
            width: '500px',
            height: '600px',
            background: 'linear-gradient(135deg, #2d1b4e 0%, #5a2d7a 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(217, 70, 239, 0.3)',
            boxShadow: '0 50px 100px rgba(0, 0, 0, 0.8)',
            padding: '40px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '32px', fontWeight: 700, marginBottom: '30px' }}>
            Preview
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '40px',
              border: '2px solid rgba(217, 70, 239, 0.2)',
            }}
          >
            <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
              Profile Settings
            </div>
            <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
              Configure your account preferences and security options
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 8: Data Table Microscopic Zoom
const DataTableMicroscopic: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(progress, [0, 1], [4.0, 4.5]);
  const scrollY = interpolate(progress, [0, 1], [0, -80]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const rows = [
    { id: '#1284', name: 'John Smith', status: 'Active', value: '$2,450' },
    { id: '#1285', name: 'Emma Davis', status: 'Pending', value: '$1,890' },
    { id: '#1286', name: 'Mike Johnson', status: 'Active', value: '$3,120' },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) rotateX(-10deg) rotateY(-5deg) translate(-20%, -15%)`,
            transformStyle: 'preserve-3d',
            width: '900px',
            height: '500px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 40px 80px rgba(0, 0, 0, 0.8)',
            padding: '40px',
            overflow: 'hidden',
          }}
        >
          <div style={{ transform: `translateY(${scrollY}px)` }}>
            <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '32px', fontWeight: 700, marginBottom: '30px' }}>
              Recent Orders
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.5)', fontSize: '14px', textAlign: 'left', paddingBottom: '20px' }}>
                    Order ID
                  </th>
                  <th style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.5)', fontSize: '14px', textAlign: 'left', paddingBottom: '20px' }}>
                    Customer
                  </th>
                  <th style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.5)', fontSize: '14px', textAlign: 'left', paddingBottom: '20px' }}>
                    Status
                  </th>
                  <th style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.5)', fontSize: '14px', textAlign: 'right', paddingBottom: '20px' }}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        fontFamily: 'Inter',
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '16px',
                        padding: '16px 0',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      {row.id}
                    </td>
                    <td
                      style={{
                        fontFamily: 'Inter',
                        color: 'white',
                        fontSize: '16px',
                        padding: '16px 0',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      {row.name}
                    </td>
                    <td
                      style={{
                        fontFamily: 'Inter',
                        color: row.status === 'Active' ? '#10b981' : '#f59e0b',
                        fontSize: '14px',
                        padding: '16px 0',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      {row.status}
                    </td>
                    <td
                      style={{
                        fontFamily: 'Inter',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 600,
                        padding: '16px 0',
                        textAlign: 'right',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 9: Dashboard Grid Bird's Eye
const DashboardBirdsEye: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const rotateX = interpolate(progress, [0, 1], [-75, -68]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const widgets = [
    { title: 'Revenue', value: '$124K', color: '#10b981' },
    { title: 'Users', value: '8,245', color: '#3b82f6' },
    { title: 'Orders', value: '1,428', color: '#8b5cf6' },
    { title: 'Growth', value: '+24%', color: '#f59e0b' },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(0deg)`,
            transformStyle: 'preserve-3d',
            width: '1000px',
            height: '700px',
            background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
            borderRadius: '24px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 60px 120px rgba(0, 0, 0, 0.9)',
            padding: '50px',
          }}
        >
          <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '40px' }}>
            Overview
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {widgets.map((widget, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '20px',
                  padding: '40px',
                  border: `2px solid ${widget.color}30`,
                }}
              >
                <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.5)', fontSize: '18px', marginBottom: '16px' }}>
                  {widget.title}
                </div>
                <div style={{ fontFamily: 'Inter', color: widget.color, fontSize: '56px', fontWeight: 700 }}>
                  {widget.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 10: Form Fields Cinema Letterbox
const FormLetterbox: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const scrollY = interpolate(progress, [0, 1], [0, -100]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const fields = [
    { label: 'Full Name', placeholder: 'Enter your name' },
    { label: 'Email Address', placeholder: 'you@example.com' },
    { label: 'Company', placeholder: 'Your company name' },
    { label: 'Message', placeholder: 'Tell us about your project' },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Letterbox Bars */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', background: 'black', zIndex: 10 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'black', zIndex: 10 }} />

      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: 'rotateX(-18deg) rotateY(-12deg)',
            transformStyle: 'preserve-3d',
            width: '800px',
            height: '700px',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            borderRadius: '24px',
            border: '2px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 60px 120px rgba(0, 0, 0, 0.9)',
            padding: '50px',
            overflow: 'hidden',
          }}
        >
          <div style={{ transform: `translateY(${scrollY}px)` }}>
            <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '42px', fontWeight: 700, marginBottom: '40px' }}>
              Contact Form
            </div>
            {fields.map((field, i) => (
              <div key={i} style={{ marginBottom: '30px' }}>
                <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '10px' }}>
                  {field.label}
                </div>
                <div
                  style={{
                    background: 'rgba(139, 92, 246, 0.08)',
                    border: '2px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '12px',
                    padding: '18px 20px',
                    fontFamily: 'Inter',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '16px',
                  }}
                >
                  {field.placeholder}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 11: Multi-Window Grid Array
const MultiWindowGrid: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const windows = [
    { title: 'Analytics', color: '#3b82f6', size: 'large' },
    { title: 'Messages', color: '#8b5cf6', size: 'small' },
    { title: 'Calendar', color: '#10b981', size: 'small' },
    { title: 'Dashboard', color: '#f59e0b', size: 'large' },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            padding: '100px',
          }}
        >
          {windows.map((window, i) => {
            const delay = i * 0.15;
            const staggerProgress = spring({ frame: Math.max(0, frame - delay * fps), fps, config: { damping: 200 } });
            const scale = interpolate(staggerProgress, [0, 1], [0.8, 1]);
            const rotateY = i % 2 === 0 ? -15 : 15;

            return (
              <div
                key={i}
                style={{
                  transform: `scale(${scale}) rotateX(-20deg) rotateY(${rotateY}deg)`,
                  transformStyle: 'preserve-3d',
                  width: window.size === 'large' ? '500px' : '380px',
                  height: window.size === 'large' ? '350px' : '280px',
                  background: `linear-gradient(135deg, ${window.color}20 0%, ${window.color}10 100%)`,
                  borderRadius: '20px',
                  border: `2px solid ${window.color}40`,
                  boxShadow: `0 40px 80px rgba(0, 0, 0, 0.8), 0 0 40px ${window.color}20`,
                  padding: '32px',
                }}
              >
                <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '28px', fontWeight: 700 }}>
                  {window.title}
                </div>
                <div
                  style={{
                    marginTop: '24px',
                    width: '100%',
                    height: '60%',
                    background: `${window.color}15`,
                    borderRadius: '12px',
                    border: `1px solid ${window.color}30`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Shot 12: Hero Dashboard Hero Slam
const HeroDashboardSlam: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({ frame, fps, config: { damping: 180 } });
  const scale = interpolate(progress, [0, 1], [1.8, 1.0]);
  const scrollY = interpolate(progress, [0, 1], [0, -150]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const stats = [
    { label: 'Total Revenue', value: '$248,750', change: '+18.2%', color: '#10b981' },
    { label: 'Active Users', value: '14,285', change: '+12.4%', color: '#3b82f6' },
    { label: 'Conversion Rate', value: '4.8%', change: '+0.8%', color: '#8b5cf6' },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) rotateX(-20deg) rotateY(-10deg)`,
            transformStyle: 'preserve-3d',
            width: '1000px',
            height: '700px',
            background: 'linear-gradient(135deg, #0a0e27 0%, #1a0a2e 100%)',
            borderRadius: '28px',
            border: '2px solid rgba(217, 70, 239, 0.4)',
            boxShadow: '0 80px 160px rgba(0, 0, 0, 0.9), 0 0 80px rgba(217, 70, 239, 0.3)',
            padding: '60px',
            overflow: 'hidden',
          }}
        >
          <div style={{ transform: `translateY(${scrollY}px)` }}>
            <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '56px', fontWeight: 700, marginBottom: '20px' }}>
              Command Center
            </div>
            <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.6)', fontSize: '20px', marginBottom: '50px' }}>
              Real-time business metrics
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {stats.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(217, 70, 239, 0.05)',
                    borderRadius: '20px',
                    padding: '36px',
                    border: '2px solid rgba(217, 70, 239, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '10px' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontFamily: 'Inter', color: 'white', fontSize: '48px', fontWeight: 700 }}>
                      {stat.value}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      color: stat.color,
                      fontSize: '28px',
                      fontWeight: 600,
                    }}
                  >
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
