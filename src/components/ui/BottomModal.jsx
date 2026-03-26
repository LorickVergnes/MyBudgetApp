import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const BottomModal = ({ isOpen, onClose, title, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to allow CSS animation to trigger on mount
      requestAnimationFrame(() => setShow(true));
      document.body.style.overflow = 'hidden';
    } else {
      setShow(false);
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div 
      style={{ 
        position: 'fixed', inset: 0, 
        zIndex: 9999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        background: show ? 'rgba(0,0,0,0.3)' : 'transparent',
        backdropFilter: show ? 'blur(4px)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: show ? 'auto' : 'none',
      }}
      onClick={e => {
        if (e.target === e.currentTarget) {
          setShow(false);
          setTimeout(onClose, 300); // Wait for transition
        }
      }}
    >
      <div 
        className="scrollbar-hide"
        style={{ 
          width: '100%', maxWidth: 480, height: '94vh', 
          background: 'linear-gradient(170deg, #f4fcff 0%, #ffffff 40%, #f0fdf4 100%)',
          borderRadius: '32px 32px 0 0', 
          padding: '24px 20px 32px', 
          boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column',
          position: 'relative',
          transform: show ? 'translateY(0)' : 'translateY(100%)',
          opacity: show ? 1 : 0.8,
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={() => {
            setShow(false);
            setTimeout(onClose, 300);
          }} 
          style={{ 
            position: 'absolute', top: 20, right: 20, 
            background: 'rgba(0,0,0,0.08)', border: 'none', borderRadius: '50%', 
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', 
            cursor: 'pointer', zIndex: 10
          }}
        >
          <X size={20} style={{ color: '#666' }} />
        </button>

        {/* Decorative Header Icons */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 24, paddingLeft: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 20, color: '#38BDF8' }}>🏠</span>
          </div>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#FFEDD5', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4, marginLeft: -16, border: '3px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 24, color: '#FB923C' }}>🚗</span>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#FFE4E6', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, marginLeft: -16, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 20, color: '#FB7185' }}>📞</span>
          </div>
        </div>
        
        {/* Title */}
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e', textAlign: 'center', marginBottom: 16 }}>
          {title}
        </h2>

        {/* Form Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomModal;
