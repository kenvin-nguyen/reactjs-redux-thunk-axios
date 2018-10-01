import React, { Component } from 'react';
import apiHelper from './../../utils/apiHelper';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {atcAddProductRequest, actGetProductRequest, actUpdateProductRequest} from './../../actions/index';

class ProductActionPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            txtName:'',
            txtPrice: '',
            chkbStatus: '',
        };
    }

    // when edit -> use life cycle hook to get data from server and fill into edit form
    componentDidMount(){
        var {match} = this.props;
        if(match){
            var id = match.params.id;
            this.props.onEditProduct(id);
        }
    }
    
    // when edit -> use life cycle hook to get data from server and fill into edit form
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditting){
            this.setState({
                id: nextProps.itemEditting.id,
                txtName: nextProps.itemEditting.name,
                txtPrice: nextProps.itemEditting.price,
                chkbStatus: nextProps.itemEditting.status
            });
        } 
    }

    onChange = (event) =>{
        var target=event.target;
        var name =target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }

    onSave = (event) =>{
        event.preventDefault();
        var {id, txtName, txtPrice, chkbStatus} = this.state;
        var {history} = this.props;
        var product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }
        if(id){// Edit
            this.props.onUpdateProduct(product);
            history.goBack();
        }else{
            
            this.props.onAddProduct(product);
            history.goBack();
        }
    }

    render() {
        var {txtName, txtPrice, chkbStatus}= this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit = {this.onSave}>
                    <legend>Add new product</legend>
                    <div className="form-group">
                        <label >Name: </label>
                        <input type="text" className="form-control" 
                            name="txtName" 
                            value={txtName}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label >Price: </label>
                        <input type="number" className="form-control" 
                            name="txtPrice"
                            value={txtPrice}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label >Status: </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" 
                                name="chkbStatus"
                                value={chkbStatus}
                                onChange={this.onChange}
                                checked={chkbStatus}
                            />
                            In-stock
                        </label>
                    </div>
                    <Link to="/products" className="btn btn-danger mr-10">
                        Back
                    </Link>
                    <button type="submit" className="btn btn-primary">Save</button>
                    
                </form>
            </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        itemEditting: state.itemEditting
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return{
        onAddProduct: (product) =>{
            dispatch(atcAddProductRequest(product));
        },
        onEditProduct: (id) =>{
            dispatch(actGetProductRequest(id));
        },
        onUpdateProduct: (product) =>{
            dispatch(actUpdateProductRequest(product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);