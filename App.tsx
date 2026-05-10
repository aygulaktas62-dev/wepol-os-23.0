import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Calendar, 
  CloudSun, 
  Image, 
  ShoppingBag, 
  Settings, 
  Clock, 
  Calculator, 
  MapPin, 
  FileText, 
  Mail, 
  Phone, 
  Compass, 
  MessageCircle, 
  Music,
  Camera,
  Flashlight,
  ArrowUp,
  ChevronLeft,
  Plane,
  Volume2,
  Sun,
  Shield,
  Fingerprint,
  Check,
  Palette,
  Accessibility,
  Circle,
  RotateCcw,
  Terminal,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { APPS, DOCK_APPS, AppInfo } from './constants';

const ICON_MAP: Record<string, any> = {
  Calendar, CloudSun, Image, ShoppingBag, Settings, Clock, Calculator, MapPin, FileText, Mail, Phone, Compass, MessageCircle, Music, Camera, Flashlight, Shield, Fingerprint, Check, Palette, Accessibility, Circle, RotateCcw, Terminal, Zap, AlertTriangle
};

interface TerminalAppProps {
  isFrozen: boolean;
  isGlitching: boolean;
  isSafeMode: boolean;
  triggerVirus: () => void;
  triggerHaptic: (type?: 'light' | 'medium' | 'heavy') => void;
}

const TerminalApp = ({ isFrozen, isGlitching, isSafeMode, triggerVirus, triggerHaptic }: TerminalAppProps) => {
  const [history, setHistory] = useState<string[]>(['WePol OS Kernel v1.4.2 Booting...', 'Login successful. Type commands to start.']);
  const [input, setInput] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    if (!cmdStr.trim()) return;

    const cmd = cmdStr.toLowerCase().trim();
    setHistory(prev => [...prev, `> ${cmdStr}`]);

    if (cmd === 'virus') {
      setHistory(prev => [...prev, 'CRITICAL ERROR: EXECUTING MALICIOUS SCRIPT...', 'SYSTEM OVERLOAD DETECTED', 'REBOOT REQUIRED - ERROR 0x884']);
      triggerVirus();
    } else if (cmd === 'clear') {
      setHistory([]);
    } else if (cmd === 'help') {
      setHistory(prev => [...prev, 'Available commands: help, clear, status, virus']);
    } else if (cmd === 'status') {
      setHistory(prev => [...prev, `Battery: 85%`, `Safe Mode: ${isSafeMode ? 'ACTIVE' : 'INACTIVE'}`, 'CPU: 92% Utilization']);
    } else {
      setHistory(prev => [...prev, `Command not found: ${cmd}`]);
    }
    
    setInput('');
    triggerHaptic('light');
  };

  const onKeyPress = (key: string) => {
    if (isFrozen) return;
    
    // Virus effect: characters might be deleted or jitter
    if (isGlitching) {
       if (Math.random() > 0.6) {
          // Randomly "delete" or ignore when glitching
          setInput(prev => prev.slice(0, -1));
          triggerHaptic('medium');
          return;
       }
    }
    
    triggerHaptic('light');
    if (key === 'ENTER') {
      handleCommand(input);
    } else if (key === 'BACKSPACE') {
      setInput(prev => prev.slice(0, -1));
    } else if (key === 'SPACE') {
      setInput(prev => prev + ' ');
    } else {
      // Randomly glitch key input if virus active
      const keyToAdd = (isGlitching && Math.random() > 0.9) ? String.fromCharCode(Math.random() * 26 + 97) : key;
      setInput(prev => prev + keyToAdd);
    }
  };

  return (
    <div className="h-full bg-black text-green-500 font-mono text-[10px] p-4 flex flex-col pt-12 overflow-hidden">
      <div ref={containerRef} className="flex-1 overflow-y-auto mb-2 space-y-1">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-white' : line.includes('ERROR') ? 'text-red-500 animate-pulse' : ''}>
            {line}
          </div>
        ))}
        {isFrozen && <div className="text-red-600 bg-red-100 px-1 inline-block animate-pulse">SYSTEM HALTED</div>}
      </div>
      
      <div className="flex border-t border-green-900/50 pt-2 pb-2">
        <span className="mr-2">$</span>
        <div className="flex-1 flex items-center min-h-[1.5em] relative">
          <span className="text-white whitespace-pre-wrap">{input}</span>
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-1.5 h-3 bg-green-500 ml-0.5"
          />
        </div>
      </div>

      <AnimatePresence>
        {isKeyboardVisible && !isFrozen && (
          <motion.div 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            className="mt-2 -mx-4 -mb-4 bg-zinc-900/90 backdrop-blur-xl border-t border-white/10 p-2 pb-12 grid grid-cols-10 gap-1 shadow-2xl relative"
            style={isGlitching ? { 
              animation: `glitch 0.2s infinite`,
              transform: `scale(${0.95 + Math.random() * 0.1}) translateY(${Math.random() * 4}px)`
            } : {}}
          >
            {'QWERTYUIOPASDFGHJKLZXCVBNM'.split('').map(key => (
              <button 
                key={key} 
                onClick={() => onKeyPress(key.toLowerCase())}
                className="h-8 rounded bg-zinc-800 text-white text-[10px] font-bold active:bg-zinc-700"
              >
                {key}
              </button>
            ))}
            <button 
              onClick={() => onKeyPress('BACKSPACE')}
              className="col-span-2 h-8 rounded bg-zinc-700 text-white text-[8px] font-bold"
            >
              DEL
            </button>
            <button 
              onClick={() => onKeyPress('SPACE')}
              className="col-span-6 h-8 rounded bg-zinc-800 text-white text-[8px] font-bold"
            >
              SPACE
            </button>
            <button 
              onClick={() => onKeyPress('ENTER')}
              className="col-span-2 h-8 rounded bg-green-700 text-white text-[8px] font-bold"
            >
              EXE
            </button>
            {isGlitching && (
                <div className="absolute inset-0 bg-green-500/10 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-green-400 opacity-50 animate-bounce" />
                </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [navStyle, setNavStyle] = useState<'bar' | 'buttons'>('bar');
  const [activeApp, setActiveApp] = useState<AppInfo | null>(null);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [aboutDeviceOpen, setAboutDeviceOpen] = useState(false);
  const [homeScreenSettingsOpen, setHomeScreenSettingsOpen] = useState(false);
  const [internetSettingsOpen, setInternetSettingsOpen] = useState(false);
  const [screenSettingsOpen, setScreenSettingsOpen] = useState(false);
  const [displayZoom, setDisplayZoom] = useState(1);
  const [displayDistance, setDisplayDistance] = useState(50);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [isParallelAnimation, setIsParallelAnimation] = useState(true);
  const [isNoAnimation, setIsNoAnimation] = useState(false);
  const [isSettingPasscode, setIsSettingPasscode] = useState(false);
  const [settingStep, setSettingStep] = useState<'current' | 'new' | 'confirm'>('new');
  const [tempPasscode, setTempPasscode] = useState('');
  const [securityError, setSecurityError] = useState(false);
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animationSettingsOpen, setAnimationSettingsOpen] = useState(false);
  const [securitySettingsOpen, setSecuritySettingsOpen] = useState(false);
  const [accessibilitySettingsOpen, setAccessibilitySettingsOpen] = useState(false);
  const [dynamicIslandSettingsOpen, setDynamicIslandSettingsOpen] = useState(false);
  const [isDynamicIslandEnabled, setIsDynamicIslandEnabled] = useState(true);
  const [isCameraPointEnabled, setIsCameraPointEnabled] = useState(false);
  const [isPasscodeEnabled, setIsPasscodeEnabled] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeEntry, setPasscodeEntry] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);
  const [apps, setApps] = useState(APPS);
  const [dockApps, setDockApps] = useState(DOCK_APPS);
  const [isEditMode, setIsEditMode] = useState(false);
  const [customizingAppId, setCustomizingAppId] = useState<string | null>(null);
  const [isRestarting, setIsRestarting] = useState(false);
  const [restartCountdown, setRestartCountdown] = useState(15);
  const [isSystemOff, setIsSystemOff] = useState(false);
  const [isSystemUpdated, setIsSystemUpdated] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [isSafeMode, setIsSafeMode] = useState(false);

  const ICON_COLORS = [
    'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-400 text-black',
    'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500',
    'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-fuchsia-500',
    'bg-pink-500', 'bg-rose-500', 'bg-zinc-800', 'bg-white text-zinc-900', 'bg-black text-white'
  ];

  const updateAppColor = (appId: string, newColor: string) => {
    setApps(prev => prev.map(app => app.id === appId ? { ...app, color: newColor } : app));
    setDockApps(prev => prev.map(app => app.id === appId ? { ...app, color: newColor } : app));
  };

  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [40]
      };
      window.navigator.vibrate(patterns[type]);
    }
  };

  // Quick Settings State
  const [isWifiEnabled, setIsWifiEnabled] = useState(true);
  const [isAirplaneMode, setIsAirplaneMode] = useState(false);
  const [brightness, setBrightness] = useState(65);
  const [volume, setVolume] = useState(50);

  // App specific state
  const [calculatorInput, setCalculatorInput] = useState('0');
  const [notes, setNotes] = useState([
    { id: 1, title: 'Shopping List', content: 'Bread, Milk, Eggs, Coffee' },
    { id: 2, title: 'Ideas', content: 'New app design for AI Studio' },
  ]);
  const [messages, setMessages] = useState([
    { id: 1, from: 'Mom', text: 'Call me when you are home ❤️', time: '14:20' },
    { id: 2, from: 'Alex', text: 'Did you see the new release?', time: '12:05' },
    { id: 3, from: 'Sarah', text: 'Lunch tomorrow?', time: '09:15' },
  ]);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, app: 'Messages', title: 'Mom', text: 'Call me when you are home ❤️', time: '5m ago', icon: 'MessageCircle', color: 'bg-green-500' },
    { id: 2, app: 'Mail', title: 'GitHub', text: 'A personal access token was created', time: '1h ago', icon: 'Mail', color: 'bg-zinc-800' },
    { id: 3, app: 'Calendar', title: 'Team Sync', text: 'Starting in 15 minutes', time: '15m ago', icon: 'Calendar', color: 'bg-red-500' },
    { id: 4, app: 'System', title: 'Software Update', text: 'WePol OS 23.1 is now available.', time: '2h ago', icon: 'Zap', color: 'bg-blue-600' },
  ]);

  useEffect(() => {
    // Add Terminal app
    setApps(prev => {
      if (prev.find(a => a.id === 'terminal')) return prev;
      return [...prev, { id: 'terminal', name: 'Terminal', icon: 'Terminal', color: 'bg-zinc-900 text-green-500', component: 'TerminalApp' }];
    });
    
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      clearInterval(timer);
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => console.error(e));
    } else {
      document.exitFullscreen();
    }
  };

  const triggerVirus = () => {
    triggerHaptic('heavy');
    setIsGlitching(true);
    
    // Half screen green and distortion after typing virus
    setTimeout(() => {
      setIsFrozen(true);
      triggerHaptic('heavy');
      
      // Reboot into Safe Mode after "freeze"
      setTimeout(() => {
        setIsSystemOff(true);
        setIsGlitching(false);
        setIsFrozen(false);
        setActiveApp(null);
        
        setTimeout(() => {
          setIsSystemOff(false);
          setIsSafeMode(true);
          setIsLocked(true);
          triggerHaptic('heavy');
        }, 3000);
      }, 4000);
    }, 3000);
  };


  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateString = currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const handleUnlock = () => {
    if (isPasscodeEnabled) {
      setIsAuthenticating(true);
      setPasscodeEntry('');
    } else {
      setIsLocked(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 font-sans text-white overflow-hidden p-4">
      {/* Phone Frame Wrapper for Zoom */}
      <div 
        className="transition-transform ease-in-out"
        style={{ 
          transform: `scale(${displayZoom})`,
          transitionDuration: `${300 / animationSpeed}ms`
        }}
      >
        {/* Phone Frame */}
        <div className="relative h-[844px] w-[390px] rounded-[54px] border-[10px] border-zinc-800 bg-black shadow-[0_0_80px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
          {/* Dynamic Island / Notch */}
          {isDynamicIslandEnabled ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                triggerHaptic('light');
                // Simple interaction: shake or pulse to show it's reached
              }}
              className="absolute top-3 left-1/2 z-[100] h-7 w-28 -translate-x-1/2 rounded-full bg-black shadow-inner flex items-center justify-center cursor-pointer overflow-hidden group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-900/50 mr-12 group-hover:bg-zinc-700 transition-colors" />
              <div className="absolute inset-0 bg-white/0 hover:bg-white/5 transition-colors" />
            </motion.button>
          ) : isCameraPointEnabled && (
            <div className="absolute top-3 left-1/2 z-[100] h-4 w-4 -translate-x-1/2 rounded-full bg-black shadow-inner flex items-center justify-center pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-900/50" />
            </div>
          )}
  
          {/* Side Buttons */}
          <div className="absolute -left-[14px] top-40 h-16 w-[4px] rounded-l-md bg-zinc-800" />
          <div className="absolute -left-[14px] top-64 h-12 w-[4px] rounded-l-md bg-zinc-800" />
          <div className="absolute -left-[14px] top-80 h-12 w-[4px] rounded-l-md bg-zinc-800" />
          
          {/* Physical Power Button (User requested RED) */}
          <button 
            onClick={() => {
              triggerHaptic('heavy');
              if (activeApp) setActiveApp(null);
              else if (isEditMode) setIsEditMode(false);
              else setIsLocked(true);
            }}
            className="absolute -right-[14px] top-48 h-20 w-[6px] cursor-pointer rounded-r-md bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all hover:bg-red-500 active:scale-y-95 border-l border-zinc-900"
          />
  
          <div 
            className="relative h-full w-full overflow-hidden rounded-[44px]"
            style={{ 
              padding: `${(displayDistance - 50) / 5}px`,
              transition: 'padding 0.3s ease'
            }}
          >
            {/* System Restart / Black Screen Overlay */}
            <AnimatePresence>
              {isSystemOff && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-[1000] bg-black flex flex-col items-center justify-center gap-6"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 rounded-full border-4 border-white/10 border-t-white animate-spin"
                  />
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">WePol OS Restarting</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wallpaper Background */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-all ${isSafeMode ? 'opacity-0' : ''}`}
            style={{ 
              backgroundImage: `url(${wallpaper})`,
              filter: isLocked ? 'brightness(0.8)' : 'brightness(1)',
              transitionDuration: `${700 / animationSpeed}ms`
            }}
          />

          {/* Virus/Glitch Effects */}
          {isGlitching && (
            <div className="absolute inset-0 z-[1000] pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-green-500/80 mix-blend-color animate-pulse" />
              <div className="absolute inset-0 bg-white/20 glitch-lines" />
              <div className="absolute inset-0 flex flex-col gap-1 items-center justify-center">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-full h-1 bg-green-400 opacity-20" 
                    style={{ 
                      transform: `translateX(${Math.random() * 20 - 10}px)`,
                      animation: `glitch ${Math.random() * 0.5}s infinite`
                    }} 
                  />
                ))}
              </div>
            </div>
          )}

          {isFrozen && (
            <div className="absolute inset-0 z-[1001] bg-black/10 backdrop-blur-[1px] pointer-events-none" />
          )}

          {isSafeMode && (
            <>
              <div className="absolute inset-0 z-[2000] strobe-166" />
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[30] px-3 py-1 bg-zinc-900/80 text-[8px] font-black text-white rounded-full uppercase tracking-widest border border-white/20">
                Safe Mode
              </div>
            </>
          )}

        {/* Status Bar */}
        <div 
          onClick={() => !isLocked && setIsControlPanelOpen(!isControlPanelOpen)}
          className="absolute top-0 z-40 flex h-11 w-full items-center justify-between px-6 text-[13px] font-semibold text-white cursor-pointer"
        >
          <div className="flex-1 flex items-center justify-start pl-2 gap-2">
            <span className="leading-none">{timeString}</span>
            <div className="flex gap-1.5 opacity-60">
               {notifications.slice(0, 3).map(notif => {
                 const Icon = ICON_MAP[notif.icon] || Zap;
                 return <Icon key={notif.id} size={12} />;
               })}
               {notifications.length > 3 && <span className="text-[8px] font-bold">+ {notifications.length - 3}</span>}
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end gap-1.5 pr-2 opacity-90">
            {isAirplaneMode ? (
              <Plane size={14} className="rotate-90" />
            ) : (
              <>
                <Signal size={15} />
                {isWifiEnabled && <Wifi size={15} />}
              </>
            )}
            <span className="text-[10px] font-bold mr-0.5">100%</span>
            <div className="relative h-3 w-6 rounded-[3px] border border-white/40 p-[1px] flex items-center">
               <div className="h-full w-4/5 rounded-[1px] bg-white transition-all shadow-[0_0_2px_rgba(0,0,0,0.5)]" />
            </div>
          </div>
        </div>

        {/* Control Panel Overlay */}
        <AnimatePresence>
          {isControlPanelOpen && !isLocked && (
            <motion.div
              initial={{ y: -844, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -844, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 * animationSpeed }}
              className="absolute inset-0 z-50 bg-black/40 backdrop-blur-3xl p-8 pt-16 flex flex-col gap-6"
            >
              {/* Unified Bento-Style Control Dashboard */}
              <div className="grid grid-cols-2 gap-4">
                {/* 1. Connectivity Dashboard (2x2 Group) */}
                <div className="bg-white/10 rounded-[30px] p-4 grid grid-cols-2 gap-3 backdrop-blur-md">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      triggerHaptic('medium');
                      setIsAirplaneMode(!isAirplaneMode);
                    }}
                    className={`h-14 w-14 rounded-full flex items-center justify-center transition-colors ${isAirplaneMode ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/50'}`}
                    title="Airplane Mode"
                  >
                    <Plane size={24} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      triggerHaptic('medium');
                      setIsWifiEnabled(!isWifiEnabled);
                    }}
                    className={`h-14 w-14 rounded-full flex items-center justify-center transition-colors ${isWifiEnabled ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}
                    title="Wi-Fi"
                  >
                    <Wifi size={24} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="h-14 w-14 rounded-full flex items-center justify-center bg-white/10 text-white/50"
                    title="Cellular Data"
                  >
                    <Signal size={24} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="h-14 w-14 rounded-full flex items-center justify-center bg-white/10 text-white/50"
                    title="Network Ops"
                  >
                    <Zap size={24} />
                  </motion.button>
                </div>
                
                {/* 2. Personal & Mode Dashboard */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="h-14 w-14 rounded-[22px] bg-white/10 text-white/50 flex items-center justify-center"
                    title="Flashlight"
                  >
                    <Flashlight size={24} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="h-14 w-14 rounded-[22px] bg-white/10 text-white/50 flex items-center justify-center"
                    title="Screen Mirroring"
                  >
                    <ArrowUp size={24} strokeWidth={2.5} />
                  </motion.button>
                  
                  {/* Media Mini-Player */}
                  <div 
                    className="col-span-2 bg-white/10 rounded-[24px] p-3 flex items-center gap-3 active:bg-white/20 transition-colors cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white/40 shadow-sm">
                      <Music size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] font-bold text-white/80 uppercase tracking-widest truncate">Not Playing</span>
                      <span className="text-[8px] font-medium text-white/30 uppercase tracking-widest truncate">WePol Media Hub</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setNotifications(prev => [{
                          id: Date.now(), app: 'Music', title: 'System', text: 'Media playback is paused.', time: 'Just now', icon: 'Music', color: 'bg-pink-500'
                        }, ...prev]);
                      }}
                      className="text-white/40 p-2 hover:text-white/80"
                    >
                      <Zap size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. System Sliders Block */}
              <div className="grid grid-cols-2 gap-4">
                 {/* Brightness Slider */}
                 <div className="bg-white/10 rounded-[30px] p-4 flex flex-col items-center gap-3">
                    <div className="w-full h-12 bg-white/10 rounded-2xl relative overflow-hidden group cursor-pointer">
                      <motion.div 
                        className="absolute h-full left-0 bg-white/25 transition-all duration-300"
                        style={{ width: `${brightness}%` }}
                      />
                      <div className="absolute inset-0 flex items-center px-4 pointer-events-none gap-2">
                         <Sun size={16} className="text-white/60" />
                         <span className="text-[10px] font-bold text-white/40 uppercase">{brightness}%</span>
                      </div>
                      <input 
                        type="range" min="0" max="100" value={brightness}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (Math.abs(val - brightness) > 5) triggerHaptic('light');
                          setBrightness(val);
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <span className="text-[9px] font-bold text-white/40 uppercase">Brightness</span>
                 </div>

                 {/* Volume Slider */}
                 <div className="bg-white/10 rounded-[30px] p-4 flex flex-col items-center gap-3">
                    <div className="w-full h-12 bg-white/10 rounded-2xl relative overflow-hidden group cursor-pointer">
                      <motion.div 
                        className="absolute h-full left-0 bg-white/25 transition-all duration-300"
                        style={{ width: `${volume}%` }}
                      />
                      <div className="absolute inset-0 flex items-center px-4 pointer-events-none gap-2">
                         <Volume2 size={16} className="text-white/60" />
                         <span className="text-[10px] font-bold text-white/40 uppercase">{volume}%</span>
                      </div>
                      <input 
                        type="range" min="0" max="100" value={volume}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (Math.abs(val - volume) > 5) triggerHaptic('light');
                          setVolume(val);
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <span className="text-[9px] font-bold text-white/40 uppercase">Volume</span>
                 </div>
              </div>

              {/* 4. Quick Utilities Grid */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: Flashlight, label: 'LED', color: 'bg-white/10' },
                  { icon: Calculator, label: 'Calc', color: 'bg-white/10' },
                  { icon: Clock, label: 'Alarm', color: 'bg-white/10' },
                  { icon: Camera, label: 'Cam', color: 'bg-white/10' }
                ].map((action, i) => (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className={`h-14 w-14 rounded-2xl ${action.color} flex items-center justify-center text-white/80 shadow-inner backdrop-blur-sm border border-white/5`}>
                      <action.icon size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-wide">{action.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* 5. Notification Center */}
              <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-hidden">
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Recent Activity</h3>
                  <button 
                    onClick={() => setNotifications([])}
                    className="text-white/30 text-[10px] font-bold uppercase tracking-widest hover:text-white/60 transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1 custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="h-24 flex items-center justify-center border border-white/5 rounded-3xl bg-white/5">
                       <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">No alerts</span>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <motion.div
                        layout
                        key={notif.id}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white/5 rounded-2xl p-4 flex gap-4 backdrop-blur-md border border-white/5 group relative"
                      >
                         <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.color} text-white shadow-sm`}>
                            {(() => {
                              const Icon = ICON_MAP[notif.icon] || Zap;
                              return <Icon size={20} />;
                            })()}
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-0.5">
                               <span className="text-white/90 font-bold text-sm truncate">{notif.title}</span>
                               <span className="text-white/30 text-[9px] font-bold uppercase">{notif.time}</span>
                            </div>
                            <p className="text-white/50 text-xs line-clamp-1">{notif.text}</p>
                         </div>
                         <button 
                          onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
                          className="absolute -right-2 top-0 translate-x-full group-hover:translate-x-0 transition-transform w-8 h-full bg-white/10 rounded-r-2xl text-white/40 flex items-center justify-center"
                         >
                            ✕
                         </button>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
              
              <div 
                onClick={() => setIsControlPanelOpen(false)}
                className="mt-auto mb-4 border-t border-white/10 pt-6 flex justify-center cursor-pointer"
              >
                <div className="h-1.5 w-32 rounded-full bg-white/20" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="relative h-full w-full">
          <AnimatePresence mode="wait">
            {isLocked ? (
              <motion.div
                key="lockscreen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ y: -844 }}
                transition={{ type: 'spring', damping: 30, stiffness: 200 * animationSpeed, mass: 1 / animationSpeed }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-between py-24 px-6 backdrop-blur-[2px]"
              >
                {!isAuthenticating ? (
                  <>
                    <div className="text-center mt-12">
                      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[20px] font-medium text-white/90">
                        {dateString}
                      </motion.div>
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-1 text-[84px] font-bold tracking-tighter leading-none">
                        {timeString}
                      </motion.div>
                    </div>

                    <div className="w-full px-6 flex flex-col items-center pb-8">
                      <motion.div 
                        onClick={handleUnlock}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowUp size={20} className="text-white/50" />
                        <span className="text-[12px] font-semibold text-white/40 uppercase tracking-[0.2em]">Swipe up to open</span>
                      </motion.div>
                    </div>
                  </>
                ) : (
                  <motion.div 
                    initial={{ y: 844 }}
                    animate={{ y: 0 }}
                    className="flex flex-col items-center w-full h-full justify-center gap-12"
                  >
                    <div className="text-center space-y-4">
                      <h2 className="text-xl font-semibold text-white/90">Enter Passcode</h2>
                      <div className="flex gap-4 justify-center">
                        {[0, 1, 2, 3].map(i => (
                          <div 
                            key={i}
                            className={`h-3 w-3 rounded-full border border-white/50 transition-all ${passcodeEntry.length > i ? 'bg-white' : 'bg-transparent'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <motion.button
                          key={num}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            triggerHaptic('light');
                            if (passcodeEntry.length < 4) {
                              const newEntry = passcodeEntry + num;
                              setPasscodeEntry(newEntry);
                              if (newEntry.length === 4) {
                                if (newEntry === passcode) {
                                  triggerHaptic('heavy');
                                  setIsLocked(false);
                                  setIsAuthenticating(false);
                                } else {
                                  triggerHaptic('medium');
                                  setTimeout(() => setPasscodeEntry(''), 400);
                                }
                              }
                            }
                          }}
                          className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-semibold border border-white/5 active:bg-white/20"
                        >
                          {num}
                        </motion.button>
                      ))}
                                           <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          triggerHaptic('light');
                          if (passcodeEntry.length < 4) {
                            const newEntry = passcodeEntry + '0';
                            setPasscodeEntry(newEntry);
                            if (newEntry.length === 4) {
                              if (newEntry === passcode) {
                                triggerHaptic('heavy');
                                setIsLocked(false);
                                setIsAuthenticating(false);
                              } else {
                                triggerHaptic('medium');
                                setTimeout(() => setPasscodeEntry(''), 400);
                              }
                            }
                          }
                        }}
                        className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-semibold border border-white/5 active:bg-white/20"
                      >
                        0
                      </motion.button>
                      {isFingerprintEnabled ? (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            triggerHaptic('heavy');
                            setIsLocked(false);
                            setIsAuthenticating(false);
                          }}
                          className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-blue-400 border border-white/5 active:bg-white/20"
                        >
                          <Fingerprint size={32} />
                        </motion.button>
                      ) : (
                        <button 
                          onClick={() => setIsAuthenticating(false)}
                          className="text-white/60 font-semibold text-xs py-4"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="homescreen"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => {
                  if (isEditMode) setIsEditMode(false);
                }}
                className="absolute inset-0 z-20 flex flex-col justify-between pt-24 pb-12 px-6"
              >
                {/* Apps Grid */}
                <div className="relative">
                  {isSafeMode && (
                    <div className="absolute -top-12 left-1/2 -track-x-1/2 whitespace-nowrap bg-red-600/90 text-white text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter animate-bounce z-50">
                      Restricted Mode - Reset via Accessibility
                    </div>
                  )}
                  <Reorder.Group 
                    axis="y" 
                    values={apps} 
                    onReorder={setApps}
                    className="grid grid-cols-4 gap-x-4 gap-y-8"
                  >
                    {apps.map((app) => {
                      const isDisabled = isSafeMode && app.id !== 'settings';
                      return (
                        <Reorder.Item
                          key={app.id}
                          value={app}
                          whileDrag={{ scale: 1.1, zIndex: 50 }}
                          className={`relative ${isDisabled ? 'pointer-events-none' : ''}`}
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              if (!isSafeMode) setIsEditMode(true);
                            }}
                            onClick={() => {
                              if (isEditMode) {
                                setCustomizingAppId(app.id);
                                triggerHaptic('medium');
                              } else {
                                setActiveApp(app);
                              }
                            }}
                            className={`flex flex-col items-center gap-1.5 w-full transition-all ${isDisabled ? 'opacity-20 grayscale' : 'opacity-100'}`}
                          >
                            <motion.div 
                              animate={isEditMode ? {
                                rotate: [0, -1, 1, 0],
                                y: [0, -1, 1, 0],
                                transition: { 
                                  repeat: Infinity, 
                                  duration: 0.4,
                                  ease: "linear"
                                }
                              } : { rotate: 0, y: 0 }}
                              className={`flex h-[60px] w-[60px] items-center justify-center rounded-[14px] ${app.color} shadow-lg ring-1 ring-black/5 relative`}
                            >
                              {!isSafeMode && (() => {
                                const Icon = ICON_MAP[app.icon];
                                return <Icon size={app.id === 'clock' ? 32 : 30} strokeWidth={2.5} />;
                              })()}
                              {isDisabled && !isSafeMode && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Zap size={16} className="text-zinc-500 fill-zinc-500" />
                                </div>
                              )}
                              {isSafeMode && (
                                <div className="text-[8px] font-mono text-zinc-600">NULL</div>
                              )}
                              {isEditMode && (
                                <>
                                  <div className="absolute inset-0 bg-black/5 rounded-[14px] pointer-events-none" />
                                  <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -left-2 w-5 h-5 bg-zinc-800 text-white rounded-full flex items-center justify-center shadow-md border border-white/20"
                                  >
                                    <span className="text-[12px] font-bold">−</span>
                                  </motion.div>
                                </>
                              )}
                            </motion.div>
                            {!isSafeMode && <span className="text-[11px] font-semibold text-white/95 drop-shadow-md truncate w-full text-center">{app.name}</span>}
                          </motion.button>
                        </Reorder.Item>
                      );
                    })}
                  </Reorder.Group>
                </div>

                {/* Bottom Dock */}
                <div className={`mx-auto flex w-full justify-between items-center bg-white/20 p-4 rounded-[34px] backdrop-blur-[30px] border border-white/10 shadow-2xl transition-all ${isSafeMode ? 'grayscale opacity-50' : ''}`}>
                  {dockApps.map((app) => (
                    <motion.button
                      key={app.id}
                      disabled={isSafeMode}
                      whileHover={!isSafeMode ? { scale: 1.12 } : {}}
                      whileTap={!isSafeMode ? { scale: 0.9 } : {}}
                      onClick={() => {
                        if (isEditMode) {
                          setCustomizingAppId(app.id);
                          triggerHaptic('medium');
                        } else {
                          setActiveApp(app);
                        }
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        if (!isSafeMode) setIsEditMode(true);
                      }}
                      className="relative flex flex-col items-center gap-1.5"
                    >
                      <motion.div
                        animate={isEditMode ? {
                          rotate: [0, 1, -1, 0],
                          y: [0, 1, -1, 0],
                          transition: { 
                            repeat: Infinity, 
                            duration: 0.4,
                            ease: "linear",
                            delay: 0.1 // Slight offset for more natural feel
                          }
                        } : { rotate: 0, y: 0 }}
                        className={`flex h-[60px] w-[60px] items-center justify-center rounded-[14px] ${isSafeMode ? 'bg-zinc-900 border border-zinc-800' : app.color} shadow-lg ring-1 ring-black/5 flex-shrink-0 relative`}
                      >
                        {!isSafeMode && (() => {
                          const Icon = ICON_MAP[app.icon];
                          return <Icon size={30} strokeWidth={2.5} />;
                        })()}
                        {isSafeMode && (
                           <div className="absolute inset-0 flex items-center justify-center">
                              <Zap size={16} className="text-zinc-700" />
                           </div>
                        )}
                        {isEditMode && (
                          <>
                            <div className="absolute inset-0 bg-black/5 rounded-[14px] pointer-events-none" />
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-2 -left-2 w-5 h-5 bg-zinc-800 text-white rounded-full flex items-center justify-center shadow-md border border-white/20"
                            >
                              <span className="text-[12px] font-bold">−</span>
                            </motion.div>
                          </>
                        )}
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* App Customization Overlay */}
          <AnimatePresence>
            {customizingAppId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
                onClick={() => setCustomizingAppId(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl space-y-8"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                       <h3 className="text-xl font-bold text-zinc-900 leading-tight">Customize Icon</h3>
                       <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                         {apps.find(a => a.id === customizingAppId)?.name || dockApps.find(a => a.id === customizingAppId)?.name}
                       </p>
                    </div>
                    {(() => {
                      const app = apps.find(a => a.id === customizingAppId) || dockApps.find(a => a.id === customizingAppId);
                      if (!app) return null;
                      const Icon = ICON_MAP[app.icon];
                      return (
                        <div className={`h-24 w-24 rounded-[22px] ${app.color} shadow-xl ring-4 ring-black/5 flex items-center justify-center transition-all duration-300 relative`}>
                           <Icon size={48} strokeWidth={2.5} />
                           {/* Subtle overlay effect during customization */}
                           <div className="absolute inset-0 rounded-[22px] bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Palette size={24} className="text-white/80" />
                           </div>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">Background Color</span>
                    <div className="grid grid-cols-5 gap-3">
                      {ICON_COLORS.map((colorClass) => {
                        const app = apps.find(a => a.id === customizingAppId) || dockApps.find(a => a.id === customizingAppId);
                        const isSelected = app?.color === colorClass;
                        return (
                          <button
                            key={colorClass}
                            onClick={() => {
                              triggerHaptic('light');
                              updateAppColor(customizingAppId, colorClass);
                            }}
                            className={`h-9 w-9 rounded-full ${colorClass.split(' ')[0]} border-2 transition-all flex items-center justify-center ${isSelected ? 'border-zinc-900 scale-110 shadow-md' : 'border-black/5 hover:scale-105'}`}
                          >
                            {isSelected && <Check size={16} className={colorClass.includes('text-black') || colorClass.includes('bg-white') ? 'text-zinc-900' : 'text-white'} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button 
                    onClick={() => setCustomizingAppId(null)}
                    className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all text-sm uppercase tracking-widest"
                  >
                    Done
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active App Window Overlay */}
          <AnimatePresence>
            {activeApp && (
              <motion.div
                initial={{ scale: 0.4, opacity: 0, scaleY: 0.2, y: 300, borderRadius: 100 }}
                animate={{ scale: 1, opacity: 1, scaleY: 1, y: 0, borderRadius: 0 }}
                exit={{ scale: 0.2, opacity: 0, scaleY: 0.1, y: 400, borderRadius: 100 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 * animationSpeed }}
                className="absolute inset-0 z-50 flex flex-col bg-slate-50 text-black shadow-2xl overflow-hidden"
              >
                <div className="flex h-full w-full flex-col pt-12">
                  <div className="px-6 py-4 flex items-center justify-between border-b bg-white">
                    <div className="flex items-center gap-3">
                      {activeApp.id === 'settings' && (aboutDeviceOpen || homeScreenSettingsOpen || internetSettingsOpen || screenSettingsOpen || animationSettingsOpen || securitySettingsOpen || accessibilitySettingsOpen || dynamicIslandSettingsOpen) && (
                        <button 
                          onClick={() => {
                            if (isSettingPasscode) {
                              setIsSettingPasscode(false);
                              return;
                            }
                            if (dynamicIslandSettingsOpen) {
                              setDynamicIslandSettingsOpen(false);
                              return;
                            }
                            setAboutDeviceOpen(false);
                            setHomeScreenSettingsOpen(false);
                            setInternetSettingsOpen(false);
                            setScreenSettingsOpen(false);
                            setAnimationSettingsOpen(false);
                            setSecuritySettingsOpen(false);
                            setAccessibilitySettingsOpen(false);
                          }}
                          className="p-1 -ml-1 rounded-full hover:bg-zinc-100 transition-colors"
                        >
                          <ChevronLeft size={20} className="text-blue-600" />
                        </button>
                      )}
                      <h2 className="text-2xl font-bold tracking-tight">
                        {activeApp.id === 'settings' ? (
                          aboutDeviceOpen ? 'About' : 
                          homeScreenSettingsOpen ? 'Home Screen' : 
                          internetSettingsOpen ? 'Internet' :
                          screenSettingsOpen ? 'Display & Brightness' :
                          animationSettingsOpen ? 'Animations' :
                          securitySettingsOpen ? 'Security' :
                          accessibilitySettingsOpen ? 'Accessibility' :
                          dynamicIslandSettingsOpen ? 'Dynamic Island' :
                          activeApp.name
                        ) : activeApp.name}
                      </h2>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveApp(null);
                        setAboutDeviceOpen(false);
                        setHomeScreenSettingsOpen(false);
                        setInternetSettingsOpen(false);
                        setScreenSettingsOpen(false);
                        setAnimationSettingsOpen(false);
                        setSecuritySettingsOpen(false);
                        setIsSettingPasscode(false);
                      }} 
                      className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition-colors"
                    >
                      <span className="text-sm font-bold">✕</span>
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                    <div className="space-y-4 max-w-sm mx-auto h-full">
                      {activeApp.id === 'settings' && securitySettingsOpen && (
                        <div 
                          className="space-y-6 animate-in slide-in-from-right-4 h-full flex flex-col"
                          style={{ animationDuration: `${300 / animationSpeed}ms` }}
                        >
                          {!isSettingPasscode ? (
                            <>
                              <div className="bg-white rounded-2xl border shadow-sm divide-y">
                                <div className="flex justify-between items-center px-4 py-3.5">
                                  <div className="flex flex-col">
                                    <span className="text-sm font-semibold">Passcode Lock</span>
                                    <span className="text-[10px] text-zinc-400 font-bold uppercase">{isPasscodeEnabled ? 'System Protected' : 'No Passcode Set'}</span>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      triggerHaptic('heavy');
                                      if (isPasscodeEnabled) {
                                        setIsPasscodeEnabled(false);
                                        setPasscode('');
                                      } else {
                                        setIsSettingPasscode(true);
                                        setSettingStep('new');
                                        setPasscodeEntry('');
                                      }
                                    }}
                                    className={`h-6 w-11 rounded-full p-1 transition-colors ${isPasscodeEnabled ? 'bg-green-500' : 'bg-zinc-200'}`}
                                  >
                                    <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-all ${isPasscodeEnabled ? 'ml-auto' : 'ml-0'}`} />
                                  </button>
                                </div>

                                <div className="flex justify-between items-center px-4 py-3.5">
                                  <span className="text-sm font-semibold">Lock Type</span>
                                  <div className="flex bg-zinc-100 p-1 rounded-lg text-[10px] font-bold">
                                    <button className="px-3 py-1 bg-white shadow-sm rounded-md">PASSCODE</button>
                                    <button 
                                      onClick={() => {
                                        triggerHaptic('medium');
                                        setNotifications(prev => [{
                                          id: Date.now(), app: 'Security', title: 'Update', text: 'Pattern lock is coming in WePol OS 24!', time: 'Now', icon: 'Shield', color: 'bg-zinc-800'
                                        }, ...prev]);
                                      }}
                                      className="px-3 py-1 text-zinc-400"
                                    >
                                      PATTERN
                                    </button>
                                  </div>
                                </div>
                                
                                {isPasscodeEnabled && (
                                  <>
                                    <button 
                                      onClick={() => {
                                        triggerHaptic('medium');
                                        setIsSettingPasscode(true);
                                        setSettingStep('current');
                                        setPasscodeEntry('');
                                      }}
                                      className="w-full flex justify-between items-center py-3.5 px-4 hover:bg-zinc-50 transition-colors text-left"
                                    >
                                      <span className="text-sm font-semibold">Change Passcode</span>
                                      <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                                    </button>
                                    <div className="flex justify-between items-center px-4 py-3.5">
                                      <div className="flex flex-col">
                                        <span className="text-sm font-semibold">Fingerprint Unlock</span>
                                        <span className="text-[10px] text-zinc-400 font-bold uppercase">{isFingerprintEnabled ? 'Active' : 'Disabled'}</span>
                                      </div>
                                      <button 
                                        onClick={() => {
                                          triggerHaptic('medium');
                                          setIsFingerprintEnabled(!isFingerprintEnabled);
                                        }}
                                        className={`h-6 w-11 rounded-full p-1 transition-colors ${isFingerprintEnabled ? 'bg-blue-600' : 'bg-zinc-200'}`}
                                      >
                                        <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-all ${isFingerprintEnabled ? 'ml-auto' : 'ml-0'}`} />
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>

                              <div className="bg-white rounded-2xl border shadow-sm p-4">
                                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                                  A passcode protects your data and privacy. When enabled, you'll be required to enter it whenever you unlock your device.
                                </p>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-8 py-4">
                              <div className="text-center space-y-2">
                                <h3 className="text-lg font-bold">
                                  {settingStep === 'current' ? 'Enter Current Passcode' : 
                                   settingStep === 'new' ? 'Set New Passcode' : 
                                   'Confirm New Passcode'}
                                </h3>
                                <div className={`flex gap-3 justify-center transition-transform ${securityError ? 'translate-x-1' : ''}`}>
                                  {[0, 1, 2, 3].map(i => (
                                    <div 
                                      key={i}
                                      className={`h-2.5 w-2.5 rounded-full border border-zinc-300 transition-all ${passcodeEntry.length > i ? 'bg-zinc-800 scale-110' : 'bg-transparent'}`}
                                    />
                                  ))}
                                </div>
                                {securityError && <span className="text-[10px] text-red-500 font-bold uppercase animate-pulse">Incorrect Passcode</span>}
                              </div>

                              <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'back'].map((key, i) => {
                                  if (key === '') return <div key={i} />;
                                  return (
                                    <motion.button
                                      key={i}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => {
                                        triggerHaptic('light');
                                        if (key === 'back') {
                                          setPasscodeEntry(prev => prev.slice(0, -1));
                                          return;
                                        }
                                        if (passcodeEntry.length < 4) {
                                          const next = passcodeEntry + key;
                                          setPasscodeEntry(next);
                                          if (next.length === 4) {
                                            if (settingStep === 'current') {
                                              if (next === passcode) {
                                                setSettingStep('new');
                                                setPasscodeEntry('');
                                              } else {
                                                setSecurityError(true);
                                                triggerHaptic('heavy');
                                                setTimeout(() => {
                                                  setSecurityError(false);
                                                  setPasscodeEntry('');
                                                }, 600);
                                              }
                                            } else if (settingStep === 'new') {
                                              setTempPasscode(next);
                                              setSettingStep('confirm');
                                              setPasscodeEntry('');
                                            } else if (settingStep === 'confirm') {
                                              if (next === tempPasscode) {
                                                setPasscode(next);
                                                setIsPasscodeEnabled(true);
                                                setIsSettingPasscode(false);
                                                triggerHaptic('heavy');
                                              } else {
                                                setSecurityError(true);
                                                triggerHaptic('heavy');
                                                setTimeout(() => {
                                                  setSecurityError(false);
                                                  setPasscodeEntry('');
                                                  setSettingStep('new');
                                                }, 600);
                                              }
                                            }
                                          }
                                        }
                                      }}
                                      className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center text-xl font-bold border border-zinc-200 active:bg-zinc-200"
                                    >
                                      {key === 'back' ? '←' : key}
                                    </motion.button>
                                  );
                                })}
                              </div>
                              <button 
                                onClick={() => {
                                  setIsSettingPasscode(false);
                                  setPasscodeEntry('');
                                }}
                                className="text-blue-600 font-bold text-sm uppercase"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      {activeApp.id === 'calendar' && (
                        <div 
                          className="space-y-8 animate-in fade-in slide-in-from-bottom-4"
                          style={{ animationDuration: `${500 / animationSpeed}ms` }}
                        >
                          <div className="flex justify-between items-center text-red-500 font-bold px-2">
                            <span className="text-xl">May 2026</span>
                            <div className="flex gap-4 text-xs tracking-widest opacity-60"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center text-[15px] font-medium">
                            {Array.from({ length: 31 }).map((_, i) => (
                              <div key={i} className={`h-10 w-10 flex items-center justify-center rounded-full transition-all ${i === 9 ? 'bg-red-500 text-white shadow-lg' : 'hover:bg-zinc-200'}`}>
                                {i + 1}
                              </div>
                            ))}
                          </div>
                          <div className="space-y-4 pt-6 border-t font-sans">
                            <h4 className="font-bold text-lg">Upcoming Events</h4>
                            <div className="p-4 rounded-2xl bg-white border shadow-sm border-l-4 border-l-red-500">
                              <p className="font-bold">Project Launch</p>
                              <p className="text-sm text-zinc-500">10:00 AM - 11:30 AM</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeApp.id === 'weather' && (
                        <div 
                          className="text-center py-12 space-y-6 animate-in fade-in zoom-in-95"
                          style={{ animationDuration: `${500 / animationSpeed}ms` }}
                        >
                          <div className="space-y-1">
                            <h3 className="text-3xl font-semibold">San Francisco</h3>
                            <div className="text-8xl font-thin tracking-tighter ml-4">19°</div>
                            <p className="text-zinc-500 font-semibold tracking-wide">Mostly Sunny</p>
                          </div>
                          <div className="flex justify-between max-w-[200px] mx-auto text-sm font-bold">
                            <span>H: 22°</span>
                            <span>L: 14°</span>
                          </div>
                          <div className="grid grid-cols-5 gap-3 pt-12">
                            {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((day, i) => (
                              <div key={day} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border shadow-sm">
                                <span className="text-[10px] font-bold text-zinc-400">{day}</span>
                                <CloudSun size={20} className="text-orange-400" />
                                <span className="text-sm font-bold">{18 + i}°</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeApp.id === 'settings' && (
                        <div 
                          className="space-y-6 animate-in slide-in-from-right-4"
                          style={{ animationDuration: `${500 / animationSpeed}ms` }}
                        >
                          {aboutDeviceOpen ? (
                            <div 
                              className="space-y-6 animate-in slide-in-from-right-4"
                              style={{ animationDuration: `${300 / animationSpeed}ms` }}
                            >
                              <div className="bg-white rounded-2xl border shadow-sm divide-y">
                                <div className="flex justify-between items-center px-4 py-3.5">
                                  <span className="text-sm font-medium text-zinc-500">Device Name</span>
                                  <span className="text-sm font-semibold text-zinc-900">WePol 19 Pro</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3.5">
                                  <span className="text-sm font-medium text-zinc-500">Software Version</span>
                                  <span className="text-sm font-semibold text-zinc-900">WePol OS 23</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3.5">
                                  <span className="text-sm font-medium text-zinc-500">WEPOL AI Version</span>
                                  <span className="text-sm font-semibold text-zinc-900">19</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3.5">
                                  <span className="text-sm font-medium text-zinc-500">Serial Number</span>
                                  <span className="text-sm font-semibold text-zinc-900 font-mono">WPOL-19-PRO-ED67</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3.5">
                                  <span className="text-sm font-medium text-zinc-500">Manufacturer</span>
                                  <span className="text-sm font-semibold text-zinc-900">theeditz67</span>
                                </div>
                              </div>

                              <div className="bg-white rounded-2xl border shadow-sm p-4">
                                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                                  This device is running the latest version of WePol OS. All systems are operating normally. Designed by WePol in California.
                                </p>
                              </div>

                              {!isSystemUpdated && (
                                <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                                  <button 
                                    onClick={() => {
                                      if (isRestarting) return;
                                      triggerHaptic('heavy');
                                      setIsRestarting(true);
                                      setRestartCountdown(15);
                                      
                                      const timer = setInterval(() => {
                                        setRestartCountdown(prev => {
                                          if (prev <= 1) {
                                            clearInterval(timer);
                                            setIsSystemOff(true);
                                            setIsRestarting(false);
                                            
                                            // Turn back on after 20 seconds
                                            setTimeout(() => {
                                              setIsSystemOff(false);
                                              setIsLocked(true); // Lock the device once it turns on
                                              setIsSystemUpdated(true); // Mark system as updated
                                              
                                              // Add Camera app if not already there
                                              setApps(prevApps => {
                                                if (prevApps.find(a => a.id === 'camera')) return prevApps;
                                                return [...prevApps, { id: 'camera', name: 'Camera', icon: 'Camera', color: 'bg-zinc-800 text-white', component: 'CameraApp' }];
                                              });
                                              
                                              triggerHaptic('heavy');
                                            }, 20000);
                                            
                                            return 0;
                                          }
                                          return prev - 1;
                                        });
                                      }, 1000);
                                    }}
                                    disabled={isRestarting}
                                    className={`w-full py-4 font-bold text-sm uppercase tracking-widest transition-all ${isRestarting ? 'bg-zinc-100 text-zinc-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-95'}`}
                                  >
                                    {isRestarting ? `Updating in ${restartCountdown}s...` : 'Update System'}
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : homeScreenSettingsOpen ? (
                            <div 
                              className="space-y-6 animate-in slide-in-from-right-4"
                              style={{ animationDuration: `${300 / animationSpeed}ms` }}
                            >
                              <div className="bg-white rounded-2xl border shadow-sm p-4 space-y-4">
                                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Wallpapers</h4>
                                <div className="grid grid-cols-2 gap-3">
                                  {[
                                    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
                                    'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop',
                                    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop',
                                    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2670&auto=format&fit=crop',
                                    'https://images.unsplash.com/photo-1531366930499-41f667534b27?q=80&w=2670&auto=format&fit=crop',
                                    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop'
                                  ].map((url, i) => (
                                    <button 
                                      key={i}
                                      onClick={() => {
                                        triggerHaptic('light');
                                        setWallpaper(url);
                                      }}
                                      className={`relative aspect-[9/16] rounded-xl bg-zinc-200 overflow-hidden border-2 transition-all ${wallpaper === url ? 'border-blue-500 scale-95 shadow-lg' : 'border-transparent hover:scale-105'}`}
                                    >
                                      <img src={url} className="w-full h-full object-cover" alt="Wallpaper option" />
                                      {wallpaper === url && (
                                        <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                                          <div className="p-1 bg-blue-500 rounded-full text-white">
                                            <div className="w-2 h-2 border-2 border-white rounded-full" />
                                          </div>
                                        </div>
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="bg-white rounded-2xl border shadow-sm p-4 space-y-4">
                                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Navigation</h4>
                                <div className="flex justify-between items-center py-2">
                                  <span className="font-semibold text-sm">System Style</span>
                                  <div className="flex bg-zinc-100 p-1 rounded-lg">
                                    <button 
                                      onClick={() => {
                                        triggerHaptic('medium');
                                        setNavStyle('bar');
                                      }}
                                      className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${navStyle === 'bar' ? 'bg-white shadow-sm text-black' : 'text-zinc-400'}`}
                                    >
                                      BAR
                                    </button>
                                    <button 
                                      onClick={() => {
                                        triggerHaptic('medium');
                                        setNavStyle('buttons');
                                      }}
                                      className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${navStyle === 'buttons' ? 'bg-white shadow-sm text-black' : 'text-zinc-400'}`}
                                    >
                                      BUTTONS
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : internetSettingsOpen ? (
                            <div 
                              className="space-y-6 animate-in slide-in-from-right-4"
                              style={{ animationDuration: `${300 / animationSpeed}ms` }}
                            >
                              <div className="bg-white rounded-2xl border shadow-sm divide-y">
                                <div className="flex justify-between items-center px-4 py-3.5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                                      <Wifi size={16} />
                                    </div>
                                    <span className="text-sm font-semibold">Wi-Fi</span>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      triggerHaptic('heavy');
                                      setIsWifiEnabled(!isWifiEnabled);
                                    }}
                                    className={`h-6 w-11 rounded-full p-1 transition-colors ${isWifiEnabled ? 'bg-green-500' : 'bg-zinc-200'}`}
                                  >
                                    <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-all ${isWifiEnabled ? 'ml-auto' : 'ml-0'}`} />
                                  </button>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3.5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                                      <Plane size={16} />
                                    </div>
                                    <span className="text-sm font-semibold">Airplane Mode</span>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      triggerHaptic('heavy');
                                      setIsAirplaneMode(!isAirplaneMode);
                                    }}
                                    className={`h-6 w-11 rounded-full p-1 transition-colors ${isAirplaneMode ? 'bg-orange-500' : 'bg-zinc-200'}`}
                                  >
                                    <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-all ${isAirplaneMode ? 'ml-auto' : 'ml-0'}`} />
                                  </button>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3.5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                                      <Compass size={16} />
                                    </div>
                                    <span className="text-sm font-semibold">Personal Hotspot</span>
                                  </div>
                                  <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                                </div>
                              </div>
                            </div>
                          ) : screenSettingsOpen ? (
                            <div 
                              className="space-y-6 animate-in slide-in-from-right-4"
                              style={{ animationDuration: `${300 / animationSpeed}ms` }}
                            >
                              <div className="bg-white rounded-2xl border shadow-sm divide-y">
                                <div className="flex justify-between items-center px-4 py-3.5">
                                  <span className="text-sm font-semibold">Full Screen</span>
                                  <button 
                                    onClick={() => {
                                      triggerHaptic('heavy');
                                      toggleFullscreen();
                                    }}
                                    className={`h-6 w-11 rounded-full p-1 transition-colors ${isFullscreen ? 'bg-green-500' : 'bg-zinc-200'}`}
                                  >
                                    <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-all ${isFullscreen ? 'ml-auto' : 'ml-0'}`} />
                                  </button>
                                </div>
                              </div>

                              <div className="bg-white rounded-2xl border shadow-sm p-4 space-y-4">
                                <div>
                                  <div className="flex justify-between mb-2">
                                    <span className="text-xs font-bold text-zinc-400 uppercase">Display Zoom</span>
                                    <span className="text-xs font-bold text-blue-600">{(displayZoom * 100).toFixed(0)}%</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="0.8" 
                                    max="1.2" 
                                    step="0.05"
                                    value={displayZoom}
                                    onChange={(e) => {
                                      const val = parseFloat(e.target.value);
                                      if (Math.abs(val - displayZoom) > 0.04) triggerHaptic('light');
                                      setDisplayZoom(val);
                                    }}
                                    className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                  />
                                </div>
                                <div>
                                  <div className="flex justify-between mb-2">
                                    <span className="text-xs font-bold text-zinc-400 uppercase">Text Distance</span>
                                    <span className="text-xs font-bold text-blue-600">{displayDistance}px</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="10" 
                                    max="100" 
                                    value={displayDistance}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value);
                                      if (Math.abs(val - displayDistance) > 5) triggerHaptic('light');
                                      setDisplayDistance(val);
                                    }}
                                    className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : animationSettingsOpen ? (
                            <div 
                              className="space-y-6 animate-in slide-in-from-right-4"
                              style={{ animationDuration: `${300 / animationSpeed}ms` }}
                            >
                              <div className="bg-white rounded-2xl border shadow-sm p-4 space-y-4">
                                <div>
                                  <div className="flex justify-between mb-2">
                                    <span className="text-xs font-bold text-zinc-400 uppercase">Movement Speed</span>
                                    <span className="text-xs font-bold text-blue-600">x{animationSpeed.toFixed(1)}</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="0.8" 
                                    max="10" 
                                    step="0.1"
                                    value={animationSpeed}
                                    onChange={(e) => {
                                      const val = parseFloat(e.target.value);
                                      if (Math.abs(val - animationSpeed) > 0.5) triggerHaptic('light');
                                      setAnimationSpeed(val);
                                    }}
                                    className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                  />
                                  <div className="flex justify-between mt-2 text-[10px] text-zinc-400 font-bold uppercase">
                                    <span>Turtle (0.8)</span>
                                    <span>Fast (10.0)</span>
                                  </div>
                                </div>
                                
                                <div className="space-y-3 pt-4 border-t">
                                  <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                      <span className="text-sm font-semibold">Parallel Animation</span>
                                      <span className="text-[10px] text-zinc-400 font-bold uppercase">Multi-threaded motion</span>
                                    </div>
                                    <button 
                                      onClick={() => {
                                        triggerHaptic('medium');
                                        setIsParallelAnimation(!isParallelAnimation);
                                      }}
                                      className={`h-6 w-11 rounded-full p-1 transition-colors ${isParallelAnimation ? 'bg-blue-600' : 'bg-zinc-200'}`}
                                    >
                                      <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-all ${isParallelAnimation ? 'ml-auto' : 'ml-0'}`} />
                                    </button>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                      <span className="text-sm font-semibold">No Animation</span>
                                      <span className="text-[10px] text-zinc-400 font-bold uppercase">Instant transitions</span>
                                    </div>
                                    <button 
                                      onClick={() => {
                                        triggerHaptic('heavy');
                                        setIsNoAnimation(!isNoAnimation);
                                        if (!isNoAnimation) setAnimationSpeed(100);
                                        else setAnimationSpeed(1);
                                      }}
                                      className={`h-6 w-11 rounded-full p-1 transition-colors ${isNoAnimation ? 'bg-zinc-800' : 'bg-zinc-200'}`}
                                    >
                                      <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-all ${isNoAnimation ? 'ml-auto' : 'ml-0'}`} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-white rounded-2xl border shadow-sm p-4">
                                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                                  Adjust how fast the system animations play. Higher values make the UI feel snappier, while lower values provide a more relaxed motion.
                                </p>
                              </div>
                            </div>
                          ) : dynamicIslandSettingsOpen ? (
                            <div 
                               className="space-y-6 animate-in slide-in-from-right-4"
                               style={{ animationDuration: `${300 / animationSpeed}ms` }}
                             >
                               <div className="bg-white rounded-2xl border shadow-sm divide-y">
                                 <div className="flex flex-col gap-4 p-4 text-center">
                                   <div className="flex flex-col gap-1">
                                      <span className="text-sm font-semibold">Dynamic Island Status</span>
                                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isDynamicIslandEnabled ? "text-green-500" : "text-zinc-400"}`}>
                                        {isDynamicIslandEnabled ? "Currently Operational" : "Deactivated"}
                                      </span>
                                   </div>
                                   <div className="grid grid-cols-2 gap-3">
                                      <button 
                                        onClick={() => {
                                          triggerHaptic('medium');
                                          setIsDynamicIslandEnabled(true);
                                          setIsCameraPointEnabled(false);
                                        }}
                                        className={`py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${isDynamicIslandEnabled ? 'bg-zinc-900 text-white shadow-md' : 'bg-zinc-100 text-zinc-400'}`}
                                      >
                                        Open
                                      </button>
                                      <button 
                                        onClick={() => {
                                          triggerHaptic('medium');
                                          setIsDynamicIslandEnabled(false);
                                          setIsCameraPointEnabled(true);
                                        }}
                                        className={`py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${!isDynamicIslandEnabled ? 'bg-zinc-900 text-white shadow-md' : 'bg-zinc-100 text-zinc-400'}`}
                                      >
                                        Close
                                      </button>
                                   </div>
                                 </div>
                                 {!isDynamicIslandEnabled && (
                                   <div className="flex justify-between items-center px-4 py-3.5">
                                     <div className="flex flex-col">
                                       <span className="text-sm font-semibold">Camera Pointer</span>
                                       <span className="text-[10px] text-zinc-400 font-bold uppercase">Hardware Dot Notch</span>
                                     </div>
                                     <button 
                                       onClick={() => {
                                         triggerHaptic('medium');
                                         setIsCameraPointEnabled(!isCameraPointEnabled);
                                       }}
                                       className={`h-6 w-11 rounded-full p-1 transition-colors ${isCameraPointEnabled ? 'bg-blue-500' : 'bg-zinc-200'}`}
                                     >
                                       <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-all ${isCameraPointEnabled ? 'ml-auto' : 'ml-0'}`} />
                                     </button>
                                   </div>
                                 )}
                               </div>
                               <div className="p-4 bg-zinc-100 rounded-2xl">
                                  <p className="text-[10px] text-zinc-400 font-bold uppercase leading-relaxed">
                                    Closing Dynamic Island replaces the interactive notch with a minimal camera pointer.
                                  </p>
                               </div>
                             </div>
                          ) : accessibilitySettingsOpen ? (
                             <div 
                               className="space-y-6 animate-in slide-in-from-right-4"
                               style={{ animationDuration: `${300 / animationSpeed}ms` }}
                             >
                               <div className="bg-white rounded-2xl border shadow-sm divide-y">
                                 <button 
                                   onClick={() => {
                                     triggerHaptic('light');
                                     setDynamicIslandSettingsOpen(true);
                                   }}
                                   className="w-full flex justify-between items-center py-3.5 px-4 hover:bg-zinc-50 transition-colors text-left"
                                 >
                                   <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-white">
                                       <div className="w-4 h-2 rounded-full border border-white/50" />
                                     </div>
                                     <span className="text-sm font-semibold">Dynamic Island</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                     <span className="text-xs text-zinc-400 font-bold uppercase">{isDynamicIslandEnabled ? 'Open' : isCameraPointEnabled ? 'Dot' : 'Closed'}</span>
                                     <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                                   </div>
                                 </button>
                                 <button 
                                   onClick={() => {
                                     if (isRestarting) return;
                                     triggerHaptic('heavy');
                                     setIsRestarting(true);
                                     setRestartCountdown(15);
                                     
                                     const timer = setInterval(() => {
                                       setRestartCountdown(prev => {
                                         if (prev <= 1) {
                                           clearInterval(timer);
                                           setIsSystemOff(true);
                                           setIsRestarting(false);
                                           
                                           // Turn back on after 20 seconds
                                           setTimeout(() => {
                                             setIsSystemOff(false);
                                             setIsLocked(true);
                                             triggerHaptic('heavy');
                                           }, 20000);
                                           
                                           return 0;
                                         }
                                         return prev - 1;
                                       });
                                     }, 1000);
                                   }}
                                   disabled={isRestarting}
                                   className="w-full flex justify-between items-center py-3.5 px-4 hover:bg-zinc-50 transition-colors text-left"
                                 >
                                   <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white">
                                       <RotateCcw size={16} />
                                     </div>
                                     <span className="text-sm font-semibold">Phone Reset</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                     <span className="text-xs text-red-500 font-bold uppercase">
                                       {isRestarting ? `${restartCountdown}s` : 'Reset'}
                                     </span>
                                     <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                                   </div>
                                 </button>
                               </div>

                               <div className="p-4 bg-zinc-100 rounded-2xl">
                                  <p className="text-[10px] text-zinc-400 font-bold uppercase leading-relaxed font-bold">
                                    Accessibility features help you customize your WePol OS experience to your needs.
                                  </p>
                               </div>
                             </div>
                          ) : (
                            <>
                              <div className="space-y-px rounded-2xl overflow-hidden border shadow-sm bg-white">
                                <button 
                                  onClick={() => setAboutDeviceOpen(true)}
                                  className="w-full flex justify-between items-center py-3.5 px-4 hover:bg-zinc-50 transition-colors text-left"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-blue-600">
                                      <div className="w-3.5 h-3.5 border-2 border-white rounded-full flex items-center justify-center">
                                        <div className="w-1 h-1 bg-white rounded-full" />
                                      </div>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-sm">About Device</span>
                                      <span className="text-[10px] text-zinc-400 font-bold uppercase">WePol OS 23</span>
                                    </div>
                                  </div>
                                  <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                                </button>
                                <button 
                                  onClick={() => setInternetSettingsOpen(true)}
                                  className="w-full flex justify-between items-center py-3.5 px-4 hover:bg-zinc-50 transition-colors text-left"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-blue-500">
                                      <Wifi size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-sm">Internet</span>
                                      <span className="text-[10px] text-zinc-400 font-bold uppercase">Wi-Fi & Cellular</span>
                                    </div>
                                  </div>
                                  <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                                </button>
                                <button 
                                  onClick={() => setHomeScreenSettingsOpen(true)}
                                  className="w-full flex justify-between items-center py-3.5 px-4 hover:bg-zinc-50 transition-colors text-left"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-green-500">
                                      <Image size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-sm">Home Screen</span>
                                      <span className="text-[10px] text-zinc-400 font-bold uppercase">Wallpaper & Navigation</span>
                                    </div>
                                  </div>
                                  <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                                </button>
                                <button 
                                  onClick={() => setScreenSettingsOpen(true)}
                                  className="w-full flex justify-between items-center py-3.5 px-4 hover:bg-zinc-50 transition-colors text-left border-t"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-blue-400">
                                      <CloudSun size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-sm">Display & Brightness</span>
                                      <span className="text-[10px] text-zinc-400 font-bold uppercase">Zoom & Distance</span>
                                    </div>
                                  </div>
                                  <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                                </button>
                                <button 
                                  onClick={() => setAnimationSettingsOpen(true)}
                                  className="w-full flex justify-between items-center py-3.5 px-4 hover:bg-zinc-50 transition-colors text-left border-t"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-purple-500">
                                      <Zap size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-sm">Animations</span>
                                      <span className="text-[10px] text-zinc-400 font-bold uppercase">Speed & Motion</span>
                                    </div>
                                  </div>
                                  <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                                </button>
                                <button 
                                  onClick={() => setSecuritySettingsOpen(true)}
                                  className="w-full flex justify-between items-center py-3.5 px-4 hover:bg-zinc-50 transition-colors text-left border-t"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-zinc-800">
                                      <Shield size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-sm">Security</span>
                                      <span className="text-[10px] text-zinc-400 font-bold uppercase">Passcode & Lock</span>
                                    </div>
                                  </div>
                                  <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                                </button>
                                <button 
                                  onClick={() => setAccessibilitySettingsOpen(true)}
                                  className="w-full flex justify-between items-center py-3.5 px-4 hover:bg-zinc-50 transition-colors text-left border-t"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-blue-600">
                                      <Accessibility size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-sm">Accessibility</span>
                                      <span className="text-[10px] text-zinc-400 font-bold uppercase">Dynamic Island & Visuals</span>
                                    </div>
                                  </div>
                                  <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                                </button>
                              </div>
                            </>
                          )}
                    </div>
                  )}

                      {activeApp.id === 'terminal' && (
                        <TerminalApp 
                          isFrozen={isFrozen}
                          isGlitching={isGlitching}
                          isSafeMode={isSafeMode}
                          triggerVirus={triggerVirus}
                          triggerHaptic={triggerHaptic}
                        />
                      )}
                      {activeApp.id === 'calculator' && (
                        <div className="flex flex-col h-full bg-black -m-6 p-4">
                          <div className="flex-1 flex flex-col justify-end items-end p-6 pb-8">
                            <span className="text-white text-7xl font-light tracking-tighter">{calculatorInput}</span>
                          </div>
                          <div className="grid grid-cols-4 gap-3">
                            {['AC', '+/-', '%', '/'].map((char) => (
                              <button 
                                key={char} 
                                onClick={() => {
                                  if (char === 'AC') setCalculatorInput('0');
                                  else if (char === '+/-') setCalculatorInput(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev);
                                }}
                                className={`h-20 w-20 rounded-full flex items-center justify-center text-2xl font-semibold ${['/', '*', '-', '+', '='].includes(char) ? 'bg-orange-500 text-white' : char === 'AC' || char === '+/-' || char === '%' ? 'bg-zinc-300 text-black' : 'bg-zinc-800 text-white'}`}
                              >
                                {char}
                              </button>
                            ))}
                            {['7', '8', '9', 'x'].map((char) => (
                              <button 
                                key={char} 
                                onClick={() => setCalculatorInput(prev => prev === '0' ? char : prev + char)}
                                className={`h-20 w-20 rounded-full flex items-center justify-center text-2xl font-semibold ${char === 'x' ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-white'}`}
                              >
                                {char}
                              </button>
                            ))}
                            {['4', '5', '6', '-'].map((char) => (
                              <button 
                                key={char} 
                                onClick={() => setCalculatorInput(prev => prev === '0' ? char : prev + char)}
                                className={`h-20 w-20 rounded-full flex items-center justify-center text-2xl font-semibold ${char === '-' ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-white'}`}
                              >
                                {char}
                              </button>
                            ))}
                            {['1', '2', '3', '+'].map((char) => (
                              <button 
                                key={char} 
                                onClick={() => setCalculatorInput(prev => prev === '0' ? char : prev + char)}
                                className={`h-20 w-20 rounded-full flex items-center justify-center text-2xl font-semibold ${char === '+' ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-white'}`}
                              >
                                {char}
                              </button>
                            ))}
                            <button 
                              onClick={() => setCalculatorInput(prev => prev === '0' ? '0' : prev + '0')}
                              className="col-span-2 h-20 rounded-full bg-zinc-800 text-white flex items-center pl-8 text-2xl font-semibold"
                            >
                              0
                            </button>
                            <button className="h-20 w-20 rounded-full bg-zinc-800 text-white flex items-center justify-center text-2xl font-semibold">.</button>
                            <button className="h-20 w-20 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-semibold">=</button>
                          </div>
                        </div>
                      )}

                      {activeApp.id === 'notes' && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center mb-6">
                            <h3 className="text-3xl font-bold">Notes</h3>
                            <button className="text-orange-500 font-bold">Edit</button>
                          </div>
                          <div className="bg-white rounded-2xl overflow-hidden border divide-y">
                            {notes.map((note) => (
                              <div key={note.id} className="p-4 hover:bg-zinc-50 cursor-pointer group">
                                <h4 className="font-bold text-zinc-900">{note.title}</h4>
                                <p className="text-sm text-zinc-500 truncate">{note.content}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-center pt-8">
                             <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg">
                                <span className="text-2xl">+</span>
                             </div>
                          </div>
                        </div>
                      )}

                      {activeApp.id === 'messages' && (
                        <div className="h-full flex flex-col -m-6 bg-white">
                          <div className="p-6 pb-2">
                             <div className="flex justify-between items-center mb-6">
                               <h3 className="text-3xl font-bold">Messages</h3>
                               <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                                  <FileText size={16} className="text-blue-600" />
                               </div>
                             </div>
                             <div className="relative mb-4">
                                <div className="absolute inset-y-0 left-3 flex items-center text-zinc-400">
                                   <span className="text-sm">🔍</span>
                                </div>
                                <input className="w-full bg-zinc-100 rounded-xl py-2 pl-10 pr-4 text-sm outline-none" placeholder="Search" />
                             </div>
                          </div>
                          <div className="flex-1 overflow-y-auto divide-y">
                            {messages.map((msg) => (
                              <div key={msg.id} className="p-4 flex gap-4 hover:bg-zinc-50 cursor-pointer">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center text-lg font-bold text-white uppercase">
                                  {msg.from[0]}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <span className="font-bold">{msg.from}</span>
                                    <span className="text-xs text-zinc-400">{msg.time}</span>
                                  </div>
                                  <p className="text-sm text-zinc-500 line-clamp-1">{msg.text}</p>
                                </div>
                                <ChevronLeft size={16} className="text-zinc-300 rotate-180 self-center" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeApp.id === 'music' && (
                        <div className="h-full flex flex-col -m-6 bg-zinc-900 text-white p-8">
                           <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                              <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-2xl overflow-hidden ring-4 ring-white/10">
                                 <div className="w-full h-full flex items-center justify-center">
                                    <Music size={120} className="text-white/20" />
                                 </div>
                              </div>
                              <div className="text-center space-y-2">
                                 <h3 className="text-2xl font-bold">Midnight Dreams</h3>
                                 <p className="text-pink-400 font-semibold">Neon Horizon</p>
                              </div>
                           </div>
                           <div className="space-y-8 pb-12">
                              <div className="space-y-2">
                                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-1/3 bg-white" />
                                 </div>
                                 <div className="flex justify-between text-[10px] font-bold text-white/40">
                                    <span>1:24</span>
                                    <span>3:45</span>
                                 </div>
                              </div>
                              <div className="flex justify-between items-center px-4">
                                 <button className="text-white/60"><div className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center">⏪</div></button>
                                 <button className="w-20 h-20 rounded-full bg-white text-zinc-950 flex items-center justify-center text-3xl">▶️</button>
                                 <button className="text-white/60"><div className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center">⏩</div></button>
                              </div>
                           </div>
                        </div>
                      )}

                      {activeApp.id === 'photos' && (
                        <div className="space-y-6">
                           <div className="flex justify-between items-center">
                              <h3 className="text-3xl font-bold">Library</h3>
                              <span className="text-blue-600 font-bold">Select</span>
                           </div>
                           <div className="grid grid-cols-3 gap-1 -mx-2">
                              {[
                                 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop',
                                 'https://images.unsplash.com/photo-1531366930499-41f667534b27?q=80&w=2670&auto=format&fit=crop',
                                 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2670&auto=format&fit=crop',
                                 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop',
                                 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop',
                                 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2574&auto=format&fit=crop',
                                 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop',
                                 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop',
                                 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2670&auto=format&fit=crop'
                              ].map((url, i) => (
                                 <div key={i} className="aspect-square bg-zinc-200 overflow-hidden">
                                    <img src={url} className="w-full h-full object-cover" alt="Library item" />
                                 </div>
                              ))}
                           </div>
                        </div>
                      )}

                      {activeApp.id === 'appstore' && (
                        <div className="space-y-8 pb-12">
                           <div className="flex justify-between items-center">
                              <h3 className="text-3xl font-bold">Today</h3>
                              <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden border">
                                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aygul" alt="Profile" />
                              </div>
                           </div>
                           <div className="space-y-6">
                              <div className="relative group overflow-hidden rounded-3xl shadow-xl aspect-square">
                                 <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" alt="Feature" />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Editors Choice</span>
                                    <h4 className="text-white text-2xl font-bold">New Creative Tools</h4>
                                    <p className="text-white/80 text-sm mt-1">Unlock your imagination today.</p>
                                 </div>
                              </div>
                              <div className="bg-white rounded-3xl p-6 border shadow-sm border-zinc-100 flex gap-4 items-center">
                                 <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-blue-600">
                                    <Camera size={32} />
                                 </div>
                                 <div className="flex-1">
                                    <h4 className="font-bold text-zinc-900">CamPro 2</h4>
                                    <p className="text-sm text-zinc-500">Professional photography</p>
                                 </div>
                                 <button className="px-6 py-1.5 bg-zinc-100 text-blue-600 rounded-full font-bold text-sm">GET</button>
                              </div>
                           </div>
                        </div>
                      )}

                      {activeApp.id === 'clock' && (
                        <div className="h-full flex flex-col -m-6 bg-black text-white p-8">
                           <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                              <div className="relative w-64 h-64 border-4 border-zinc-800 rounded-full flex items-center justify-center">
                                 <div className="absolute inset-0 flex items-center justify-center">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                       <div key={i} className="absolute inset-4" style={{ transform: `rotate(${i * 30}deg)` }}>
                                          <div className="w-1 h-3 bg-zinc-700 mx-auto rounded-full" />
                                       </div>
                                    ))}
                                 </div>
                                 <div className="w-1.5 h-24 bg-white rounded-full translate-y-[-12px]" />
                                 <div className="absolute w-1.5 h-32 bg-orange-500/80 rounded-full translate-y-[-16px] origin-bottom" style={{ transform: 'rotate(120deg)' }} />
                                 <div className="w-4 h-4 bg-white rounded-full z-10 shadow-lg" />
                              </div>
                              <h3 className="text-5xl font-light tabular-nums leading-none pt-8">{timeString}</h3>
                              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Cupertino, USA</p>
                           </div>
                           <div className="grid grid-cols-4 gap-4 pb-12">
                              {['World', 'Alarm', 'Stopwatch', 'Timer'].map((label, i) => (
                                 <div key={label} className={`flex flex-col items-center gap-1.5 py-4 rounded-2xl ${i === 2 ? 'text-orange-500' : 'text-zinc-500'}`}>
                                    <Clock size={20} />
                                    <span className="text-[10px] font-bold uppercase">{label}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                      )}

                      {activeApp.id === 'maps' && (
                        <div className="h-full -mx-6 -my-6 relative overflow-hidden bg-zinc-100">
                           <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2666&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 grayscale-[0.2]" alt="Map background" />
                           <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                           <div className="absolute top-12 left-6 right-6">
                              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 flex gap-3 items-center">
                                 <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-inner">
                                    <MapPin size={20} />
                                 </div>
                                 <input className="bg-transparent flex-1 outline-none text-sm font-semibold" placeholder="Search for a place" />
                              </div>
                           </div>
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                              <motion.div 
                                 animate={{ y: [0, -10, 0] }}
                                 transition={{ repeat: Infinity, duration: 2 }}
                                 className="relative"
                              >
                                 <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-2xl border-2 border-white ring-8 ring-blue-500/20">
                                    <MapPin size={24} fill="currentColor" />
                                 </div>
                                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/20 rounded-full blur-[2px]" />
                              </motion.div>
                           </div>
                           <div className="absolute bottom-12 right-6 space-y-4">
                              <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-blue-600">
                                 <Compass size={24} />
                              </div>
                              <div className="w-12 h-12 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center">
                                 <ArrowUp size={24} />
                              </div>
                           </div>
                        </div>
                      )}

                      {activeApp.id === 'mail' && (
                        <div className="h-full flex flex-col -m-6 bg-white">
                           <div className="p-6 pb-2">
                              <h3 className="text-3xl font-bold mb-6">Inbox</h3>
                           </div>
                           <div className="flex-1 overflow-y-auto divide-y">
                              {[
                                 { from: 'Apple', subject: 'Your receipt from Apple', preview: 'Thank you for your purchase. Your subscription has been renewed...', time: 'Yesterday' },
                                 { from: 'GitHub', subject: '[GitHub] A personal access token was created', preview: 'A new personal access token was created on your account...', time: '10:45 AM' },
                                 { from: 'LinkedIn', subject: 'Aygul, see who is hiring in your area', preview: 'Check out these news jobs at Microsoft, Google and more...', time: '08:22 AM' }
                              ].map((email, i) => (
                                 <div key={i} className="p-6 flex gap-4 hover:bg-zinc-50 cursor-pointer">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                                    <div className="flex-1 space-y-1">
                                       <div className="flex justify-between items-start">
                                          <span className="font-bold text-zinc-900">{email.from}</span>
                                          <span className="text-xs text-zinc-400">{email.time}</span>
                                       </div>
                                       <h4 className="font-semibold text-sm line-clamp-1">{email.subject}</h4>
                                       <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">{email.preview}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                      )}

                      {activeApp.id === 'phone' && (
                        <div className="h-full flex flex-col -m-6 bg-white">
                           <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12">
                              <div className="w-32 h-32 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                                 <Phone size={64} />
                              </div>
                              <div className="grid grid-cols-3 gap-8 w-full max-w-[280px]">
                                {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map((num) => (
                                  <div key={num} className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-2xl font-semibold hover:bg-zinc-200 transition-colors cursor-pointer">
                                      {num}
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-widest">
                                      {num === 2 ? 'ABC' : num === 3 ? 'DEF' : num === 4 ? 'GHI' : num === 5 ? 'JKL' : num === 6 ? 'MNO' : num === 7 ? 'PQRS' : num === 8 ? 'TUV' : num === 9 ? 'WXYZ' : ''}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-xl shadow-green-200 cursor-pointer">
                                 <Phone size={32} fill="currentColor" />
                              </div>
                           </div>
                           <div className="grid grid-cols-5 border-t py-2">
                             {['Favorites', 'Recents', 'Contacts', 'Keypad', 'Voicemail'].map((label, i) => (
                               <div key={label} className={`flex flex-col items-center gap-1 ${i === 3 ? 'text-blue-600' : 'text-zinc-400'}`}>
                                 <div className="w-6 h-6 flex items-center justify-center">
                                    {i === 2 ? <Phone size={18} /> : i === 3 ? <div className="grid grid-cols-3 gap-0.5"><div className="w-1 h-1 bg-current" /><div className="w-1 h-1 bg-current" /><div className="w-1 h-1 bg-current" /><div className="w-1 h-1 bg-current" /><div className="w-1 h-1 bg-current" /><div className="w-1 h-1 bg-current" /><div className="w-1 h-1 bg-current" /><div className="w-1 h-1 bg-current" /><div className="w-1 h-1 bg-current" /></div> : <Calendar size={18} />}
                                 </div>
                                 <span className="text-[9px] font-bold uppercase">{label}</span>
                               </div>
                             ))}
                           </div>
                        </div>
                      )}

                      {activeApp.id === 'safari' && (
                        <div className="h-full flex flex-col -m-6 bg-white">
                           <div className="p-4 pt-12 bg-zinc-50 border-b">
                              <div className="bg-zinc-200/50 rounded-xl px-4 py-2 flex items-center gap-2">
                                 <div className="text-zinc-400">🔒</div>
                                 <span className="text-sm font-medium text-zinc-600">google.com</span>
                                 <div className="ml-auto text-zinc-400 rotate-90">↻</div>
                              </div>
                           </div>
                           <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 bg-white">
                              <div className="text-4xl font-bold tracking-tighter">
                                 <span className="text-blue-500">G</span>
                                 <span className="text-red-500">o</span>
                                 <span className="text-yellow-500">o</span>
                                 <span className="text-blue-500">g</span>
                                 <span className="text-green-500">l</span>
                                 <span className="text-red-500">e</span>
                              </div>
                              <div className="w-full relative">
                                 <input className="w-full border rounded-full py-3 px-6 shadow-sm text-sm outline-none bg-white" placeholder="Search or enter website name" />
                                 <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 font-bold">🔍</div>
                              </div>
                              <div className="grid grid-cols-4 gap-6 w-full pt-8">
                                 {[
                                    { icon: '🎬', name: 'YouTube' },
                                    { icon: '📸', name: 'Instagram' },
                                    { icon: '💬', name: 'Chat' },
                                    { icon: '📧', name: 'Gmail' }
                                 ].map((site) => (
                                    <div key={site.name} className="flex flex-col items-center gap-2">
                                       <div className="w-12 h-12 rounded-xl bg-zinc-50 border flex items-center justify-center text-2xl shadow-sm">{site.icon}</div>
                                       <span className="text-[10px] font-medium text-zinc-500">{site.name}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                           <div className="p-4 flex justify-between items-center border-t text-blue-600">
                              <ChevronLeft size={24} />
                              <ChevronLeft size={24} className="rotate-180" />
                              <ShoppingBag size={20} />
                              <Calendar size={20} />
                              <FileText size={20} />
                           </div>
                        </div>
                      )}

                      {!['calendar', 'weather', 'settings', 'calculator', 'notes', 'messages', 'music', 'photos', 'appstore', 'clock', 'maps', 'mail', 'phone', 'safari'].includes(activeApp.id) && (
                        <div className="flex flex-col items-center justify-center h-[500px] animate-pulse">
                          <div className={`p-8 rounded-[30px] ${activeApp.color} shadow-2xl mb-8`}>
                            {(() => {
                              const Icon = ICON_MAP[activeApp.icon];
                              return <Icon size={80} strokeWidth={1.5} />;
                            })()}
                          </div>
                          <h3 className="text-xl font-bold italic text-zinc-300 uppercase tracking-[0.3em]">{activeApp.name}</h3>
                          <p className="mt-4 text-zinc-400 text-sm font-medium">Coming soon to NovaOS</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home Indicator Bar / Buttons */}
        <div className={`absolute bottom-0 left-0 z-[60] w-full pointer-events-none flex justify-center items-center ${navStyle === 'buttons' ? 'h-14 bg-black/20 backdrop-blur-md border-t border-white/5' : 'h-8'}`}>
          {navStyle === 'bar' ? (
            <motion.div 
              onClick={() => {
                triggerHaptic('medium');
                if (activeApp) setActiveApp(null);
              }}
              whileTap={{ scaleX: 0.85 }}
              className="h-1.5 w-36 mb-2 cursor-pointer rounded-full bg-white/40 shadow-sm active:bg-white/90 transition-colors pointer-events-auto"
            />
          ) : (
            <div className="flex w-full max-w-[280px] justify-between items-center pointer-events-auto">
              <button 
                onClick={() => {
                  triggerHaptic('light');
                  setIsControlPanelOpen(!isControlPanelOpen);
                }}
                className="p-3 text-white/40 hover:text-white transition-all active:scale-95 flex items-center justify-center"
                title="Recents"
              >
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-current rounded-[2px]" />
                  <div className="w-1.5 h-1.5 bg-current rounded-[0.5px]" />
                </div>
              </button>
              <button 
                onClick={() => {
                  triggerHaptic('medium');
                  setActiveApp(null);
                  setIsControlPanelOpen(false);
                  setAboutDeviceOpen(false);
                  setHomeScreenSettingsOpen(false);
                  setInternetSettingsOpen(false);
                  setScreenSettingsOpen(false);
                  setAnimationSettingsOpen(false);
                }}
                className="p-3 text-white/40 hover:text-white transition-all active:scale-90 flex items-center justify-center"
                title="Home"
              >
                <div className="relative w-5.5 h-5.5 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-current" />
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-current" />
                </div>
              </button>
              <button 
                onClick={() => {
                  triggerHaptic('light');
                  if (activeApp) {
                    if (aboutDeviceOpen) setAboutDeviceOpen(false);
                    else if (homeScreenSettingsOpen) setHomeScreenSettingsOpen(false);
                    else if (internetSettingsOpen) setInternetSettingsOpen(false);
                    else if (screenSettingsOpen) setScreenSettingsOpen(false);
                    else if (animationSettingsOpen) setAnimationSettingsOpen(false);
                    else setActiveApp(null);
                  }
                  else if (isControlPanelOpen) setIsControlPanelOpen(false);
                }}
                className="p-3 text-white/40 hover:text-white transition-all active:scale-95 flex items-center justify-center"
                title="Back"
              >
                <div className="w-0 h-0 border-y-[7px] border-y-transparent border-r-[12px] border-r-current" />
              </button>
            </div>
          )}
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
