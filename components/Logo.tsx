export const Logo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 240 60" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Isotipo: Representación sutil de una persiana/tela */}
    <rect x="0" y="15" width="8" height="30" fill="#C5A059" />
    <rect x="12" y="15" width="8" height="30" fill="#C5A059" opacity="0.6" />
    <rect x="24" y="15" width="8" height="30" fill="#C5A059" opacity="0.3" />
    
    {/* Texto DISA */}
    <text 
      x="45" 
      y="45" 
      className="font-black italic" 
      style={{ fontSize: '42px', fill: 'currentColor', letterSpacing: '-0.05em' }}
    >
      DISA
    </text>
  </svg>
);