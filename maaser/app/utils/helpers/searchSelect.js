export const DisableAutoComplete = (
  autocomplete,
  setAutocomplete,
  classname,
) => {
  if (!autocomplete) {
    let i;
    const el = document.getElementsByClassName(classname);
    for (i = 0; i < el.length; i++) {
      el[i].setAttribute('autocomplete', 'registration-select');
    }

    setAutocomplete(true);
  }
};
