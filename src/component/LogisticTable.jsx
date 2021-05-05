import React from 'react';
import s from './LogisticTable.module.css';
import { Field,  Form,  Formik } from 'formik';


const LogisticTable = (props) => {

    let pagesCount = Math.ceil(props.totalCount / props.itemsOnPage);
    let pagesArr = [];
    for (let i = 1; i <= pagesCount; i++) {
        pagesArr.push(i);
    };

    const onPageChange = (p) => {
        props.getOperations(props.itemsOnPage, p, props.column, props.condition, props.searchField);
        props.setCurrentPage(p);
    }

    const pageNumElem = pagesArr.map(p => {
        return <span onClick={() => { onPageChange(p) }}
            className={(p === props.currentPage) ? s.selected : ''}
        >{p}</span>
    });

    const headers = props.headers.map((header) => {
        return (
            <tr key={header.id}>
                <td>{header.date}</td>
                <td>{header.name}</td>
                <td>{header.quantity}</td>
                <td>{header.distance}</td>
            </tr>
        )
    })

    const operationsElements = props.operations.map((operation) => {
        return (
            <tr key={operation.id}>
                <td>{operation.date}</td>
                <td>{operation.name}</td>
                <td>{operation.quantity}</td>
                <td>{operation.distance}</td>
            </tr>
        )
    })
    
    const onSearchSubmit=(values)=>{
        props.getOperations(props.itemsOnPage, props.currentPage, values.column, values.condition, values.searchField );
        props.setCurrentPage(1);
    }

    
    return (
        <div className={s.tableWrapper}>
            {pageNumElem}
            <div>
                <Formik
                    initialValues={{
                        column: 'name',
                        condition: 'includes',
                        searchField: '',
                    }}
                    onSubmit={(values) => {
                          onSearchSubmit(values);
                      }}
                >
                    <Form>
                        <Field as="select" name="column">
                            <option value='name'>{props.headers[0].name}</option>
                            <option value='quantity'>{props.headers[0].quantity}</option>
                            <option value='distance'>{props.headers[0].distance}</option>
                        </Field>
                        <Field as="select" name="condition">
                            <option value='includes'>содержит</option>
                            <option value='equally'>равно</option>
                            <option value='more'>больше</option>
                            <option value='less'>меньше</option>
                        </Field>
                        <Field name='searchField' type='text' component='input'></Field>
                        <button type='submit'>Поиск</button>
                    </Form>
                </Formik>

            </div>
                <table className={s.table}>
                    <thead>
                        {headers}
                    </thead>
                    <tbody>
                        {operationsElements}
                    </tbody>
                </table>
        </div>
    );
}

export default LogisticTable;