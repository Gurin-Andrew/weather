import "./style.sass";
interface Props {
  active: boolean;
  setActive: (active: boolean) => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
