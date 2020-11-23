import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({ transaction }) => {
    //mengambil deleteTransaction dr GlobalContext
    const { deleteTransaction } = useContext(GlobalContext);

    const sign = transaction.amount < 0 ? '-' : '+';

    return (
        // delete amount
        <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
        {/* _id from mongodb */}
            {transaction.text} <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span><button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">x</button>
        </li>
    )
}