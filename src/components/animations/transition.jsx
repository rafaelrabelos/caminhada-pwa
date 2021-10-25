import { Transition } from "react-transition-group";

export const Fade = (props) =>  {
  const duration = 900;
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };
  return(<Transition in={props.in} timeout={duration}>
  {(state) => (
    <div
      style={{
        ...defaultStyle,
        ...transitionStyles[state],
      }}
    >
      {props.children}
    </div>
  )}
</Transition>);
}