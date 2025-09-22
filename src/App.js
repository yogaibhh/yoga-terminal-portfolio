import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Pause, BarChart3, Database, Code, Zap, Activity, Cpu, HardDrive, Wifi, User, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Download, Eye, PieChart } from 'lucide-react';

const TerminalPortfolio = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [activeSection, setActiveSection] = useState('boot');
  const [bootComplete, setBootComplete] = useState(false);
  const [systemStats, setSystemStats] = useState({
    cpu: 0,
    memory: 0,
    projects: 0,
    dataProcessed: 0
  });
  
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Boot sequence messages
  const bootSequence = [
    "YOGA-TERMINAL v2.0.1 Loading...",
    "Initializing Data Analysis Engine...",
    "Loading Python modules... ✓",
    "Connecting to SQL databases... ✓", 
    "Importing visualization libraries... ✓",
    "Loading portfolio data... ✓",
    "System ready! Type 'help' for available commands.",
    ""
  ];

  // Available commands
  const commands = {
    help: "Available commands: about, skills, experience, projects, education, contact, clear, matrix, stats, dashboard",
    about: `
╔══════════════════════════════════════════════════════════════╗
║                    MUHAMAD YOGA IBRAHIM                      ║
║                      Data Analyst v3.0                      ║
╠══════════════════════════════════════════════════════════════╣
║ Location: Bogor, Indonesia                                   ║
║ Status: Available for hire                                   ║
║ Experience: 3+ years                                         ║
║ Specialization: Data Analytics, Python, SQL, Visualization   ║
║                                                              ║
║ Bio: Detail-oriented Data Analyst with expertise in         ║
║      processing 175K+ data points, environmental research,  ║
║      and geopolitical analytics. Proven track record in     ║
║      automating workflows and creating actionable insights. ║
╚══════════════════════════════════════════════════════════════╝`,
    
    skills: `
┌─ TECHNICAL SKILLS ASSESSMENT ─┐
│                               │
│ Python         ████████████ 95%
│ SQL            ████████████ 92%
│ Excel          ██████████   88%
│ PowerBI        ████████     85%
│ ArcGIS         ███████      80%
│ Data Viz       ████████████ 93%
│ Statistics     ████████████ 90%
│ Machine Learning ████████   78%
│                               │
└─ SPECIALIZATIONS ─────────────┘
• Geopolitical Analytics & Simulation
• Weather Data Processing
• Air Quality Monitoring
• Automated Dashboard Development
• Statistical Modeling & Visualization`,

    experience: `
═══════════════════════════════════════════════════════════════════
                           WORK HISTORY
═══════════════════════════════════════════════════════════════════
[2025] PT Pixel Digital - Data Analyst
├── Geopolitical Analytics & Simulation Systems
├── Multi-agent dashboard integration  
├── Trade pattern analysis & visualization
└── Network entity analysis implementation

[2024] Anugerah Wisesa Selaras - Data Analyst  
├── Processed 480+ hours weather data
├── 40% improvement in reporting efficiency
├── Automated data processing workflows
└── Dynamic weather pattern visualizations

[2023] PIAREA Environment & Technology - Research Assistant
├── Analyzed 175,000+ hourly data points
├── Developed Jakarta Air Quality Map Album
├── 10-year rainfall & temperature trend analysis  
└── Final Report compilation for DKI Jakarta`,

    projects: `
🚀 FEATURED PROJECTS DASHBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT: MCP AI Data Analyst [Mar-Apr 2025]
STATUS: ████████████ COMPLETED
TECH: PostgreSQL | Natural Language Processing | AI/ML
DESC: Real-time SQL querying via natural language interface
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT: Jakarta Air Quality Analysis [2020-2021] 
STATUS: ████████████ COMPLETED
TECH: Python | ArcGIS | Google Earth Engine | Statistics
DESC: AOD-PM correlation analysis with geospatial modeling
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT: Weather Modification Dashboard [2024]
STATUS: ████████████ COMPLETED  
TECH: Python | Google Colab | Interactive Visualization
DESC: Real-time weather monitoring & decision support system`,

    education: `
🎓 ACADEMIC CREDENTIALS
═══════════════════════════════════════════════════════════
DEGREE: Applied Meteorology | IPB University [2020-2024]
GPA: 3.67/4.00
THESIS: "AOD-PM Relationship Analysis in Jakarta"

📜 DATA COURSES & CERTIFICATIONS:
[2025-05] Associate Business Analyst in SQL - DataCamp
[2025-04] Associate Data Analyst in SQL - DataCamp  
[2025-03] Excel Fundamentals Certification - DataCamp
[In Progress] Associate Data Analyst in Python - DataCamp
[In Progress] Associate Data Analyst in PowerBI - DataCamp
[2023] Data Analyst | Generasi Gigih 3.0 - GoTo Impact Foundation

🏆 ACHIEVEMENTS & RECOGNITION:
• Finalist - National Infographic Competition (Agrocompetition, 2022)
• Conference Presenter - Indonesian Aerosol Association (2024)
• Best Member Award - Special Team Division PSN (2021)`,

    contact: `
📡 CONTACT PROTOCOLS ACTIVE
═══════════════════════════════════════════════════════════════
📧 EMAIL: yoga.ibh205@gmail.com
📱 PHONE: +62 812-9235-8420  
📍 LOCATION: Bogor, Indonesia
🔗 LINKEDIN: linkedin.com/muhamadyogaibra/
💻 GITHUB: github.com/yogaibhh
🌐 PORTFOLIO: tiny.cc/portofolioyoga

STATUS: ████████████ AVAILABLE FOR HIRE
RESPONSE TIME: < 24 hours
TIMEZONE: WIB (UTC+7)`,

    clear: 'CLEAR_TERMINAL',
    
    matrix: `
    ╔╦╗╔═╗╔╦╗╔═╗  ╔═╗╔╗╔╔═╗╦  ╦ ╦╔═╗╔╦╗
     ║║╠═╣ ║ ╠═╣  ╠═╣║║║╠═╣║  ╚╦╝╚═╗ ║ 
    ═╩╝╩ ╩ ╩ ╩ ╩  ╩ ╩╝╚╝╩ ╩╩═╝ ╩ ╚═╝ ╩ 
    ┌─────────────────────────────────────┐
    │ MATRIX MODE: Data streams incoming... │
    └─────────────────────────────────────┘`,

    stats: `
📊 REAL-TIME SYSTEM STATISTICS
═══════════════════════════════════════════════════════════
🔥 CPU Usage: Processing algorithms... 89%
💾 Memory: Data models loaded... 76%  
📈 Projects Completed: 15+ major projects
🗂️  Data Points Processed: 175,000+ entries
⚡ Efficiency Gained: 40% faster reporting
🎯 Accuracy Rate: 99.2% in data analysis
💼 Client Satisfaction: 100% positive feedback
🚀 Skills Growth: +25% year over year`,

    dashboard: 'LOADING_DASHBOARD'
  };

  // Auto-typing effect
  useEffect(() => {
    if (isAutoMode && !bootComplete) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < bootSequence.length) {
          setCommandHistory(prev => [...prev, { 
            command: '', 
            output: bootSequence[index], 
            timestamp: new Date().toLocaleTimeString() 
          }]);
          index++;
        } else {
          setBootComplete(true);
          setActiveSection('ready');
          clearInterval(interval);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isAutoMode, bootComplete]);

  // System stats animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        cpu: Math.floor(Math.random() * 30) + 70,
        memory: Math.floor(Math.random() * 20) + 60,
        projects: 15 + Math.floor(Math.random() * 3),
        dataProcessed: 175000 + Math.floor(Math.random() * 1000)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle command execution
  const executeCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
    let output = '';

    if (command === 'clear' || commands[command] === 'CLEAR_TERMINAL') {
      setCommandHistory([]);
      return;
    }

    if (command === 'dashboard' || commands[command] === 'LOADING_DASHBOARD') {
      setActiveSection('dashboard');
      output = 'Loading interactive dashboard...';
    } else if (commands[command]) {
      output = commands[command];
    } else {
      output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setCommandHistory(prev => [...prev, {
      command: `yoga@portfolio:~$ ${cmd}`,
      output,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  // Handle input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  // Matrix effect
  const MatrixRain = () => {
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs animate-pulse"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '2s'
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => (
              <div key={j} style={{ animationDelay: `${j * 0.05}s` }}>
                {chars[Math.floor(Math.random() * chars.length)]}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Dashboard Component
  const Dashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      <div className="bg-gray-800 border border-green-500 p-4 rounded">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="text-green-400" size={20} />
          <h3 className="text-green-400 font-bold">System Status</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>CPU:</span>
            <span className="text-green-400">{systemStats.cpu}%</span>
          </div>
          <div className="flex justify-between">
            <span>Memory:</span>
            <span className="text-green-400">{systemStats.memory}%</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="text-green-400">ONLINE</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border border-green-500 p-4 rounded">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="text-green-400" size={20} />
          <h3 className="text-green-400 font-bold">Analytics</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Projects:</span>
            <span className="text-green-400">{systemStats.projects}</span>
          </div>
          <div className="flex justify-between">
            <span>Data Points:</span>
            <span className="text-green-400">{systemStats.dataProcessed.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Accuracy:</span>
            <span className="text-green-400">99.2%</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border border-green-500 p-4 rounded">
        <div className="flex items-center gap-2 mb-3">
          <Database className="text-green-400" size={20} />
          <h3 className="text-green-400 font-bold">Data Pipeline</h3>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span>Python:</span>
            <span className="text-green-400">ACTIVE</span>
          </div>
          <div className="flex justify-between">
            <span>SQL:</span>
            <span className="text-green-400">CONNECTED</span>
          </div>
          <div className="flex justify-between">
            <span>PowerBI:</span>
            <span className="text-green-400">SYNCED</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border border-green-500 p-4 rounded lg:col-span-2">
        <div className="flex items-center gap-2 mb-3">
          <PieChart className="text-green-400" size={20} />
          <h3 className="text-green-400 font-bold">Skill Distribution</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { skill: 'Python', level: 95 },
            { skill: 'SQL', level: 92 },
            { skill: 'Data Viz', level: 93 },
            { skill: 'Statistics', level: 90 }
          ].map(item => (
            <div key={item.skill} className="space-y-1">
              <div className="flex justify-between">
                <span>{item.skill}</span>
                <span className="text-green-400">{item.level}%</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded">
                <div 
                  className="bg-green-400 h-2 rounded transition-all duration-1000"
                  style={{ width: `${item.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 border border-green-500 p-4 rounded">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="text-green-400" size={20} />
          <h3 className="text-green-400 font-bold">Quick Actions</h3>
        </div>
        <div className="space-y-2">
          <button 
            onClick={() => setActiveSection('terminal')}
            className="w-full text-left text-xs bg-gray-700 hover:bg-gray-600 p-2 rounded border border-gray-600"
          >
            → Return to Terminal
          </button>
          <button className="w-full text-left text-xs bg-gray-700 hover:bg-gray-600 p-2 rounded border border-gray-600">
            → Download CV
          </button>
          <button className="w-full text-left text-xs bg-gray-700 hover:bg-gray-600 p-2 rounded border border-gray-600">
            → View Projects
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <MatrixRain />
      
      {/* Header Bar */}
      <div className="bg-gray-900 border-b border-green-500 p-2 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="text-green-400" size={20} />
            <span className="font-bold">YOGA-TERMINAL v2.0.1</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Cpu size={14} />
              <span>CPU: {systemStats.cpu}%</span>
            </div>
            <div className="flex items-center gap-1">
              <HardDrive size={14} />
              <span>MEM: {systemStats.memory}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wifi size={14} />
              <span className="text-green-400">ONLINE</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {activeSection === 'dashboard' ? (
            <button 
              onClick={() => setActiveSection('terminal')}
              className="px-3 py-1 bg-green-600 text-black rounded text-xs font-bold hover:bg-green-500"
            >
              TERMINAL
            </button>
          ) : (
            <button 
              onClick={() => setActiveSection('dashboard')}
              className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-500"
            >
              DASHBOARD
            </button>
          )}
          
          <button
            onClick={() => setIsAutoMode(!isAutoMode)}
            className={`p-1 rounded ${isAutoMode ? 'text-green-400' : 'text-gray-500'}`}
          >
            {isAutoMode ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {activeSection === 'dashboard' ? (
          <Dashboard />
        ) : (
          <div className="p-6">
            {/* Terminal Header */}
            <div className="mb-6">
              <div className="text-green-400 text-lg font-bold mb-2">
                ╔══════════════════════════════════════════════════════════════╗
              </div>
              <div className="text-green-400 text-lg font-bold text-center">
                ║           MUHAMAD YOGA IBRAHIM - DATA ANALYST TERMINAL       ║
              </div>
              <div className="text-green-400 text-lg font-bold mb-4">
                ╚══════════════════════════════════════════════════════════════╝
              </div>
            </div>

            {/* Terminal Output */}
            <div 
              ref={terminalRef}
              className="h-96 overflow-y-auto mb-4 bg-gray-900 border border-green-500 p-4 rounded"
            >
              {commandHistory.map((entry, index) => (
                <div key={index} className="mb-2">
                  {entry.command && (
                    <div className="text-green-400 font-bold">{entry.command}</div>
                  )}
                  <pre className="text-green-300 whitespace-pre-wrap text-sm leading-relaxed">
                    {entry.output}
                  </pre>
                </div>
              ))}
              
              {bootComplete && (
                <div className="flex items-center">
                  <span className="text-green-400 font-bold mr-2">yoga@portfolio:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-transparent text-green-400 border-none outline-none flex-1 font-mono"
                    placeholder="Type 'help' for available commands..."
                    autoFocus
                  />
                  <span className="animate-pulse text-green-400">▋</span>
                </div>
              )}
            </div>

            {/* Quick Command Buttons */}
            {bootComplete && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                {Object.keys(commands).filter(cmd => !['clear', 'matrix'].includes(cmd)).map(cmd => (
                  <button
                    key={cmd}
                    onClick={() => executeCommand(cmd)}
                    className="bg-gray-800 hover:bg-gray-700 border border-green-500 text-green-400 px-3 py-2 rounded text-sm transition-colors duration-200"
                  >
                    {cmd.toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            {/* System Info Footer */}
            <div className="mt-6 text-xs text-green-600 border-t border-green-800 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="font-bold mb-1">SYSTEM INFO:</div>
                  <div>OS: Data Analyst Professional v3.0</div>
                  <div>Kernel: Python-SQL-PowerBI</div>
                  <div>Uptime: Available 24/7</div>
                </div>
                <div>
                  <div className="font-bold mb-1">PERFORMANCE:</div>
                  <div>Data Processing: ████████████ 95%</div>
                  <div>Problem Solving: ████████████ 92%</div>
                  <div>Communication: ████████████ 88%</div>
                </div>
                <div>
                  <div className="font-bold mb-1">NETWORK:</div>
                  <div>Status: Ready for collaboration</div>
                  <div>Response: &lt; 24 hours</div>
                  <div>Location: Bogor, Indonesia</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Easter Egg: Konami Code or Hidden Features */}
      <div className="fixed bottom-4 right-4 text-xs text-green-600 opacity-50">
        Try: 'matrix' command for special effects
      </div>
    </div>
  );
};

export default TerminalPortfolio;