interface Props {
    backgroundColor?: string;
  }
  
  export default function ThemedBackground({ backgroundColor }: Props) {
    return (
      <div>
        <style jsx>{`
          div {
            z-index: 0;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            pointer-events: none;
            max-width: 100vw !important;
            height: 200vh;
            background: radial-gradient(
              100% 50% at 50% 50%,
              ${backgroundColor ?? "var(--gradient)"} 0%,
              rgba(255, 255, 255, 0) 100%
            );
            transform: translateY(-175vh);
          }
        `}</style>
      </div>
    );
  }
  