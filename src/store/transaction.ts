import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { FormData } from '/components/portfolio/transactionModal/FormModal';

interface TransactionType {
  id: string
  portfolioId: string | null
  coinId: string
  type: string
  date: number
  quantity: number
  pricePerCoin: { [key: string]: number }
  fee: number
  notes: string | null
  createdAt: number
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
    addTransaction: (state, action: PayloadAction<{formData: FormData}>) => {
      const { formData } = action.payload;

      state.transactions = [
        ...state.transactions, {
          ...formData,
          id: uuidv4(),
          createdAt: +new Date(),
          pricePerCoin: formData.pricePerCoin as { [key: string]: number},
          quantity: parseFloat(formData.quantity),
          fee: parseFloat(formData.fee),
        }
      ]

    }
  }
})

export const { 
  addTransaction
} = transactionSlice.actions;
export default transactionSlice.reducer;