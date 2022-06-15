export default (parent, args, context, info) => {
  return [
    {
      __typename: "Article",
      id: "12",
      title: "test",

      type: "LONG",
    },
    {
      __typename: "Video",
      id: "12",
      title: "test",
      duration: 13,
    },
  ];
};
