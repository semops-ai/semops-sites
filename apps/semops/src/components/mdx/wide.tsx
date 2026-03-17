export function Wide({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`breakout ${className ?? ''}`}>
      {children}
    </div>
  );
}
