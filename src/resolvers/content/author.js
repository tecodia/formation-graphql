export default (parent, _, __, ___) => {
  console.log(parent);

  return {
    id: "12",
    name: "TET",
    parent,
  };
};
