import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../../featuresStore"

export interface DT9SysError {
  severity: string,
  code: number | string
  message: string
}

export interface Banners {
  error: DT9SysError | null
  async: any
  endpoints: any
  bannerList: (any)[]
  filter: string
}

const initialState: Banners = {
  error: null,
  endpoints: {
    create: {
      url: `${process.env.REACT_APP_BASE_URL}banners`,
      method: "POST",
    },
    read: {
      url: `${process.env.REACT_APP_BASE_URL}dynamic-banners`,
      method: "GET"
    },
    update: {
      url: `${process.env.REACT_APP_BASE_URL}dynamic-banners/update`,
      method: "POST"
    },
    del: {
      url: `${process.env.REACT_APP_BASE_URL}dynamic-banners/delete`,
      method: "DELETE"
    }
  },
  async: {
    initted: false,
    message: "",
    creating: false,
    created: false,
    reading: false,
    read: false,
    updating: false,
    updated: false,
    deleting: false,
    deleted: true,
  },
  bannerList: [],
  filter: "",
}

export const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    setBannersAsync: (state, action: PayloadAction<any>) => {
      const { key, value } = action.payload
      state.async[key] = value
    },
    setBannerKey: (state, action: PayloadAction<any>) => {
      const { key, value } = action.payload
      // @ts-ignore
      state[key] = value
    },
  },
})

export const selectBanners = (state: RootState) => state.banners
export const { setBannerKey, setBannersAsync } = bannersSlice.actions
export default bannersSlice.reducer
