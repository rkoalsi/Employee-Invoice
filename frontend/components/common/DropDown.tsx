import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function DropDown(props: any) {
  const {
    items,
    label,
    onChange,
    onChangeTitle = 'description',
    onChangeIndex = null,
    value = '',
    id = 'demo-select-small2',
  } = props;
  const [val, setVal] = React.useState(value);
  const handleChange = (event: SelectChangeEvent) => {
    setVal(event.target.value);
    if (onChangeIndex >= 0) {
      onChange(onChangeTitle, event.target.value, onChangeIndex);
    } else {
      onChange(onChangeTitle, event.target.value);
    }
  };
  return (
    <FormControl sx={{ minWidth: 160 }}>
      <InputLabel id='demo-select-small'>{label}</InputLabel>
      <Select
        labelId='demo-select-small'
        id={id}
        value={val}
        label={label}
        onChange={(e) => handleChange(e)}
      >
        {items?.map((i: any) => (
          <MenuItem key={i.value || i._id} value={i.value || i._id}>
            {i.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
