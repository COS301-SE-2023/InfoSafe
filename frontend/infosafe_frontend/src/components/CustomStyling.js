
export const customStyles= {
    control: (base, state) => ({
        ...base,
        background: "#CECECE",
        // match with the menu
        borderRadius: state.isFocused ? "2px 2px 0 0" : 3,
        // Removes weird border around container
        boxShadow: state.isFocused ? null : null,
        width: "70%",
        color: 'black',
        borderColor: state.isFocused ? "grey" : "transparent",
        '&:hover': { borderColor: 'grey' }
    }),
    menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0,
        width: "70%",
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0

    }),
    dropdownIndicator: base => ({
        ...base,
        color: '#999',
    }),
    placeholder: base => ({
        ...base,
        color: 'black'
    }),
    multiValue: base => ({
        ...base,
        background: "white",
        color: 'black'
    })
};
