import 'react-native-get-random-values'
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'

import {
  FormData,
  SubmitNumericData,
} from '/components/portfolio/transactionModal/FormModal'

type RemoveAllTransactionProps = {
  portfolioId: string
  coinId: string
}
export interface TransactionType {
  id: string
  portfolioId: string | null
  coinId: string
  symbol: string
  type: string
  date: number
  quantity: number
  pricePerCoin: { [key: string]: number }
  fee: { [key: string]: number }
  notes: string | null
  transferType: null | string
  createdAt: number
  updatedAt: number | null
}

interface InitialState {
  transactions: TransactionType[] | []
}

const initialState: InitialState = {
  transactions: [],
}

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransaction: (
      state,
      action: PayloadAction<{ formData: FormData<SubmitNumericData> }>
    ) => {
      const { formData } = action.payload

      state.transactions = [
        ...state.transactions,
        {
          ...formData,
          id: nanoid(),
          symbol: formData.symbol,
          createdAt: +new Date(),
          quantity: Number(formData.quantity),
          updatedAt: null,
        },
      ]
    },
    removeTransaction: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload

      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== id
      )
    },
    removeAllTransaction: (
      state,
      action: PayloadAction<RemoveAllTransactionProps>
    ) => {
      const { coinId, portfolioId } = action.payload

      state.transactions = state.transactions.filter(
        (transaction) =>
          transaction.portfolioId !== portfolioId ||
          transaction.coinId !== coinId
      )
    },
    editTransaction: (
      state,
      action: PayloadAction<{
        transactionId: string
        formData: FormData<SubmitNumericData>
      }>
    ) => {
      const {
        transactionId,
        formData: {
          quantity,
          fee,
          notes,
          type,
          transferType,
          pricePerCoin,
          date,
        },
      } = action.payload

      const targetIndex = state.transactions.findIndex(
        (transaction) => transaction.id === transactionId
      )

      state.transactions[targetIndex] = {
        ...state.transactions[targetIndex],
        quantity: Number(quantity),
        date,
        pricePerCoin,
        fee,
        notes,
        type,
        transferType,
        updatedAt: +new Date(),
      }
    },
  },
})

export const {
  addTransaction,
  removeTransaction,
  removeAllTransaction,
  editTransaction,
} = transactionSlice.actions
export default transactionSlice.reducer
