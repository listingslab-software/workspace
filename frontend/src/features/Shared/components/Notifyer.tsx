import * as React from 'react'
import {
  useFeatureSelect,
  useFeatureDispatch,
} from "../../Shared/store/hooks"
import {
  Snackbar,
  Alert,
} from "@mui/material"
import {
  setBannerKey,
} from "../../Banners"
import {
  selectShared,
  setSharedKey,
} from "../../Shared"

export default function Notifyer() {
  
  const dispatch = useFeatureDispatch()
  const shared = useFeatureSelect(selectShared)
  const { 
    notifying, 
  } = shared
  if( !notifying ) return null
  const { severity, message } = notifying

  const closeSnackbar = () =>  dispatch(setSharedKey({
    key: "notifying", 
    value: null 
  }))

  return (
    <Snackbar
      open
      anchorOrigin={{ 
        vertical:"top", 
        horizontal:"center" 
      }}
      autoHideDuration={ 5000 }
      onClose={ closeSnackbar }
    >
      <Alert 
        onClose={ closeSnackbar } 
        variant="filled"
        severity={ severity }
        sx={{ width: '100%' }}>
          { message }
      </Alert>
    </Snackbar>
  )
}
