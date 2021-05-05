import  React  from 'react';
import { connect } from "react-redux";
import {  getOperations, setCurrentPage} from "../redux/logisticTableReducer";
import LogisticTable from './LogisticTable';


class LogisticTableContainer extends React.Component {

    componentDidMount() {
        this.props.getOperations(this.props.itemsOnPage, this.props.currentPage, 'name', 'includes', '')
    }

    render() {
        return (
            < LogisticTable {...this.props} />
        )
    }

}

let mapStateToProps = (state) => {
    return {
        operations: state.logisticTable.operations,
        headers: state.logisticTable.headers,
        totalCount: state.logisticTable.totalCount,
        currentPage: state.logisticTable.currentPage,
        itemsOnPage: state.logisticTable.itemsOnPage,
        column: state.logisticTable.column,
        condition: state.logisticTable.condition,
        searchField: state.logisticTable.searchField,
    }
}


export default connect(mapStateToProps, { setCurrentPage, getOperations })(LogisticTableContainer);