import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { search_param, search_submit, search_exit } from '../redux/actions'

const styles = theme => ({
    root: {
        display:"flex",
        flexGrow: 1,
        flexDirection :"column",
        //alignItems:'center'
    },
    row:{
        display: "flex",

    },
    button: {
        margin: theme.spacing.unit,

    },
    textField:{
        display: "flex",
        flexGrow: 1,
        margin: theme.spacing.unit,

    },
        formControl: {
            margin: theme.spacing.unit,
            minWidth: 120,
            maxWidth: 300,
        },
        mySelect: {
            display: 'flex',
            flexWrap: 'wrap',
        },

});

const MultipleSelect = ({classes, name, values, onChange, selected}) => {
    const selectedArr = selected ? selected : [];

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>{name}</InputLabel>
            <Select
                multiple
                autoWidth={false}
                value={selectedArr}
                onChange={onChange}
                input={<Input />}
                renderValue={selectedArr => selectedArr.sort().join(', ')}
                className={classes.myselect}
            >
                {values.map(val => (
                    <MenuItem key={val} value={val} >
                        <Checkbox checked={selectedArr.indexOf(val) > -1} />
                        <ListItemText primary={val} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

const SearchForm = ({ classes, grades, holds, search_param, onChange, onCancel, onSearch }) => {
        return (
            <div className={classes.root} >
                <Typography variant="h3" align={'center'} gutterBottom>
                    Search Problems
                </Typography>
                <div className={classes.row} >
                        <TextField
                            id="name"
                            label="Name"
                            className={classes.textField}
                            value={search_param.Name}
                            onChange={onChange('Name')}
                            margin="normal"
                        />
                        <TextField
                            id="author"
                            label="Author"
                            className={classes.textField}
                            value={search_param.Setter}
                        onChange={onChange('Setter')}
                            margin="normal"
                        />
                </div >

                <MultipleSelect
                    name="grades"
                    values={grades}
                    selected={search_param.Grades}
                    onChange={onChange("Grades")}
                    classes={classes}
                />
                                
                <span>
                    <Button 
                    variant="contained" 
                    className={classes.button} 
                    onClick={onCancel}
                    >
                        Back
                    </Button>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={onSearch(search_param)}
                    >
                        Search
                    </Button>
                </span>
            </div>
        );
    };

SearchForm.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return ({
        search_param: state.search_param,
        grades: state.grades,
        holds: state.holds,
    })
}
const mapDispatchToProps = (dispatch) => ({
    onChange: (name) => (event) => { dispatch(search_param(name, event.target.value)); },
    onSearch: (param)=>() => {dispatch(search_submit(param))},
    onCancel: () => { dispatch(search_exit)},

}
)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SearchForm))

 

