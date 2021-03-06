import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { FormData, SubmitNumericData } from '/components/portfolio/transactionModal/FormModal';

export interface TransactionType {
  id: string
  portfolioId: string | null
  coinId: string
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
  transactions: []
}

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<{ formData: FormData<SubmitNumericData> }>) => {
      const { formData } = action.payload;

      state.transactions = [
        ...state.transactions, {
          ...formData,
          id: uuidv4(),
          createdAt: +new Date(),
          quantity: Number(formData.quantity),
          updatedAt: null
        }
      ]
    },
    removeTransaction: (state, action: PayloadAction<{id: string}>) => {
      const { id } = action.payload;

      state.transactions = state.transactions.filter(
        transaction => transaction.id !== id
      )
    },
    editTransaction: (
      state, 
      action: PayloadAction<{ transactionId: string, formData: FormData<SubmitNumericData> }>
    ) => {
      const { 
        transactionId, 
        formData: { quantity, fee, notes, type, transferType, pricePerCoin, date }
      } = action.payload;

      const targetIndex = state.transactions.findIndex(
        transaction => transaction.id === transactionId
      );

      state.transactions[targetIndex] = {
        ...state.transactions[targetIndex],
        quantity: Number(quantity),
        date,
        pricePerCoin,
        fee,
        notes,
        type,
        transferType,
        updatedAt: +new Date()
      }
    }
  }
})

export const { 
  addTransaction,
  removeTransaction,
  editTransaction
} = transactionSlice.actions;
export default transactionSlice.reducer;