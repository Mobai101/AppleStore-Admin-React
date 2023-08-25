import classes from "./Container.module.css";

// Container custom component to contain the website content into a box
// For styling purpose only

const Container = (props) => {
  return <div className={classes.container}>{props.children}</div>;
};

export default Container;
