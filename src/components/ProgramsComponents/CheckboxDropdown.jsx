import { useState } from "react";

//MUI
import { useTheme } from "@mui/material/styles";
import { MenuItem, InputLabel, FormControl, Select, Chip, Box } from "@mui/material";

// This is the the two dropdown menues for the program filtering page

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, items, theme) {
  return {
    fontWeight:
      items.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props) {
  const theme = useTheme();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleDelete = (i) => {
    const newList = selectedItems.filter((e, index) => index !== i);

    setSelectedItems(newList);
    props.onItemChecked(newList);
  };

  const names = props.items;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    props.onItemChecked(value);

    setSelectedItems(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <InputLabel>{props.label}</InputLabel>
      <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
        <Select
          multiple
          value={selectedItems}
          label={props.label}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value, index) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => handleDelete(index)}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedItems, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
