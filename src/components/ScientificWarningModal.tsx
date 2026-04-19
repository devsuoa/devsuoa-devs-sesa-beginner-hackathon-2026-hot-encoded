import type { AlienProfile } from '../data/mockAliens';
import { getScientificWarnings } from '../utils/scienceWarnings';
import { AlertTriangle, Skull, Heart, X } from 'lucide-react';

interface ScientificWarningModalProps {
  alien: AlienProfile;
  onProceed: () => void;
  onCancel: () => void;
}

export default function ScientificWarningModal({ alien, onProceed, onCancel }: ScientificWarningModalProps) {
  const warnings = getScientificWarnings(alien);
  const hasDanger = warnings.some(w => w.severity === 'danger');

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(10, 5, 30, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px',
    }}>
      <style>{`
        @keyframes warningPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(217, 3, 104, 0.3); }
          50%       { box-shadow: 0 0 40px rgba(217, 3, 104, 0.7); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .warning-card {
          animation: slideUp 0.3s ease-out, warningPulse 3s ease-in-out infinite;
        }
        .warning-row-danger {
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.4);
          border-radius: 10px;
          padding: 14px;
        }
        .warning-row-warning {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.35);
          border-radius: 10px;
          padding: 14px;
        }
      `}</style>

      <div
        className="glass-panel warning-card"
        style={{
          maxWidth: '520px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          borderRadius: '20px',
          border: `1px solid ${hasDanger ? 'rgba(220, 38, 38, 0.5)' : 'rgba(245, 158, 11, 0.5)'}`,
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: hasDanger
              ? 'linear-gradient(135deg, rgba(220,38,38,0.3), rgba(185,28,28,0.3))'
              : 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(217,119,6,0.3))',
            border: `2px solid ${hasDanger ? 'rgba(220,38,38,0.6)' : 'rgba(245,158,11,0.6)'}`,
            marginBottom: '16px',
          }}>
            {hasDanger
              ? <Skull size={36} style={{ color: 'rgb(248,113,113)' }} />
              : <AlertTriangle size={36} style={{ color: 'rgb(252,211,77)' }} />
            }
          </div>

          <h2 style={{
            margin: '0 0 8px',
            fontSize: '1.6rem',
            color: hasDanger ? 'rgb(248,113,113)' : 'rgb(252,211,77)',
          }}>
            Scientific Hazard Warning
          </h2>
          <p style={{ margin: 0, opacity: 0.75, fontSize: '0.95rem' }}>
            Travelling to {alien.name}'s home world poses{' '}
            <strong style={{ color: hasDanger ? 'rgb(248,113,113)' : 'rgb(252,211,77)' }}>
              {hasDanger ? 'life-threatening' : 'significant'} risks
            </strong>{' '}
            compared to Earth conditions.
          </p>
        </div>

        {/* Warning list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          {warnings.map((w, i) => (
            <div key={i} className={w.severity === 'danger' ? 'warning-row-danger' : 'warning-row-warning'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                {w.severity === 'danger'
                  ? <Skull size={16} style={{ color: 'rgb(248,113,113)', flexShrink: 0 }} />
                  : <AlertTriangle size={16} style={{ color: 'rgb(252,211,77)', flexShrink: 0 }} />
                }
                <span style={{
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: w.severity === 'danger' ? 'rgb(248,113,113)' : 'rgb(252,211,77)',
                }}>
                  {w.label}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', opacity: 0.6 }}>
                  {w.alienValue} vs Earth {w.earthValue}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.5 }}>
                {w.description}
              </p>
            </div>
          ))}
        </div>

        {/* Proceed question */}
        <p style={{
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '1.05rem',
          marginBottom: '20px',
          color: 'rgba(234, 222, 218, 0.9)',
        }}>
          Do you still want to match with {alien.name}?
        </p>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '14px' }}>
          <button
            onClick={onCancel}
            className="btn-outline"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px',
              fontSize: '1rem',
            }}
          >
            <X size={18} /> No, Go Back
          </button>
          <button
            onClick={onProceed}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px',
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(217, 3, 104, 0.5)',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Heart size={18} fill="white" /> Yes, Match!
          </button>
        </div>
      </div>
    </div>
  );
}
