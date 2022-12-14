import * as React from 'react'
import {
  useFeatureSelect,
  useFeatureDispatch,
} from "../../Shared/store/hooks"
import { create as createBanner } from "../../Banners"
import { create as createSite } from "../../Sites"
import {
  EditableFieldString,
} from "../../Forms"
import {
  selectShared,
  setSharedKey,
  Icon,
} from "../"
import {
  Box,
  CardHeader,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Typography,
} from "@mui/material"

export default function NewItem() {

  const [ valid, setValid] = React.useState<boolean>( false )
  const dispatch = useFeatureDispatch()
  const shared = useFeatureSelect( selectShared )
  const {newItem, newItemValue} = shared
  
  if (!newItem) return null
  const { icon, type, title } = newItem

  const handleClose = () => {
    dispatch(setSharedKey({key: "newItem", value: null }))
    dispatch(setSharedKey({key: "newItemValue", value: "" }))
  }

  const handleCreate = () => {
    if (type === "banner") dispatch(createBanner(newItemValue))
    if (type === "site") dispatch(createSite(newItemValue))
    handleClose()
  }

  const onChange = (e: any) => {
    const { value } = e.target
    if ( value.length > 2 ) setValid( true ) 
    if ( value.length <= 2 ) setValid( false )
    if ( value.length > 100 ) setValid( false )
    dispatch(setSharedKey({ key: "newItemValue", value }))
  }

  return (
    <Dialog 
      open
      fullWidth
      maxWidth={"xs"}
      onClose={ handleClose }>
      <CardHeader 
        avatar={ <Box sx={{display: "flex", mt:1 }}>
                    
                    <Box>
                      <Icon icon={icon} color="secondary" sx={{ml:1}}/>
                      </Box>
                    <Typography sx={{ml:2}}>
                      {title}
                    </Typography>
                  </Box>
                }
        action={ <IconButton
                    color="secondary"
                    onClick={ handleClose }>
                  <Icon icon="close" />
                </IconButton> }
        // title={ title }
      />
      
      <DialogContent>
        <EditableFieldString 
          field={{
            autoFocus: true,
            id: "name",
            label: "Name",
            value: newItemValue,
            onChange,
          }}/>
      </DialogContent>

      <DialogActions>
          <Button
            sx={{mr:2, ml:2, mb:1}}
            color="secondary"
            disabled={ !valid }
            variant={ valid ? "contained" : "text" }
            onClick={ handleCreate }>
            <Icon icon="save" />
            <span style={{ marginLeft: 10, marginRight: 6 }}>
              Save
            </span>
          </Button>
      </DialogActions>

    </Dialog>
  )
}
