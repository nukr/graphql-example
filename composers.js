function validatorComposer(...fns) {
  return async function(root, args, context, info) {
    for (let i = 0; i < fns.length; i += 1) {
      let predicate = await fns[i](root, args, context, info);
      if (!predicate) {
        return;
      }
    }
    return true;
  };
}

module.exports = {
  validatorComposer,
  pipelineComposer,
  businessComposer
};
