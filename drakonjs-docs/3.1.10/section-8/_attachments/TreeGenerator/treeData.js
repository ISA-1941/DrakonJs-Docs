module.exports = {
  value: 11,
  left: {
    value: 5,
    left: {
      value: 2,
      left: { value: 1 }      // новый левый потомок для узла 2
    },
    right: {
      value: 6,
      right: { value: 8 }     // новый правый потомок для узла 6
    }
  },
  right: {
    value: 17,
    left: {
      value: 15,
      left: { value: 13 }     // новый левый потомок для узла 15
    },
    right: {
      value: 19,
      right: { value: 21 }    // новый правый потомок для узла 19
    }
  }
};

