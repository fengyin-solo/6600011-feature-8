import React from 'react';
import { useEEGStore } from '../store/eeg';

const CHANNELS = ['Fp1','Fp2','F3','F4','C3','C4','P3','P4','O1','O2'];
const CHANNEL_NAMES: Record<string, string> = {
  Fp1: '左前额', Fp2: '右前额', F3: '左额', F4: '右额',
  C3: '左中央', C4: '右中央', P3: '左顶', P4: '右顶',
  O1: '左枕', O2: '右枕'
};
interface ChannelMeta {
  region: string;
  usage: string;
}
const CHANNEL_META: Record<string, ChannelMeta> = {
  Fp1: { region: '左前额极（Prefrontal Pole）', usage: '眼动与眨眼检测，前额脑电基线' },
  Fp2: { region: '右前额极（Prefrontal Pole）', usage: '眼动与眨眼检测，前额脑电基线' },
  F3:  { region: '左额叶（Frontal Lobe）', usage: '执行功能、运动规划、情绪调节' },
  F4:  { region: '右额叶（Frontal Lobe）', usage: '执行功能、运动规划、情绪调节' },
  C3:  { region: '左中央区（Central / Motor Cortex）', usage: '感觉运动节律 SMR，运动想象 BCI' },
  C4:  { region: '右中央区（Central / Motor Cortex）', usage: '感觉运动节律 SMR，运动想象 BCI' },
  P3:  { region: '左顶叶（Parietal Lobe）', usage: '体感整合、空间注意、P300 电位' },
  P4:  { region: '右顶叶（Parietal Lobe）', usage: '体感整合、空间注意、P300 电位' },
  O1:  { region: '左枕叶（Occipital Lobe）', usage: '视觉皮层 Alpha 溯源，视觉诱发电位' },
  O2:  { region: '右枕叶（Occipital Lobe）', usage: '视觉皮层 Alpha 溯源，视觉诱发电位' },
};

export const ChannelSelector: React.FC = () => {
  const { selectedChannel, setChannel } = useEEGStore();

  const meta = CHANNEL_META[selectedChannel];

  return (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 12px', fontSize: '14px', color: '#90caf9' }}>通道选择</h3>
      <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(21, 101, 192, 0.2)', borderRadius: '8px', border: '2px solid #1565c0' }}>
        <div style={{ fontSize: '11px', color: '#90caf9', marginBottom: '4px' }}>当前关注</div>
        <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '1px' }}>{selectedChannel}</div>
        <div style={{ fontSize: '12px', color: '#90caf9', marginTop: '2px' }}>{CHANNEL_NAMES[selectedChannel]}</div>
        {meta && (
          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(144, 202, 249, 0.2)' }}>
            <div style={{ fontSize: '11px', color: '#64b5f6', marginBottom: '2px' }}>
              <span style={{ marginRight: '4px' }}>📍</span>{meta.region}
            </div>
            <div style={{ fontSize: '11px', color: '#90caf9' }}>
              <span style={{ marginRight: '4px' }}>💡</span>{meta.usage}
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {CHANNELS.map(ch => {
          const m = CHANNEL_META[ch];
          const active = selectedChannel === ch;
          return (
            <button
              key={ch}
              onClick={() => setChannel(ch)}
              title={m ? `${CHANNEL_NAMES[ch]} · ${m.region}\n${m.usage}` : CHANNEL_NAMES[ch]}
              style={{
                padding: active ? '8px 14px' : '6px 12px',
                borderRadius: '16px',
                border: active ? '2px solid #64b5f6' : '1px solid #37474f',
                background: active ? '#1565c0' : '#1e293b',
                color: active ? '#fff' : '#94a3b8',
                cursor: 'pointer',
                fontSize: active ? '13px' : '12px',
                fontWeight: active ? 700 : 400,
                transition: 'all 0.2s ease',
                boxShadow: active ? '0 2px 8px rgba(21, 101, 192, 0.5)' : 'none',
                transform: active ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              {ch}
            </button>
          );
        })}
      </div>
    </div>
  );
};
