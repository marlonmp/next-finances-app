import React from 'react';

import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { AccountBalance, Close } from '@mui/icons-material';



/**
 * This component is a form to create or update accounts
 * @param {{
 *  open: boolean = false,
 *  type: 'create' | 'update' |'retrieve' = 'create',
 *  account?: object,
 *  onClose?: () => void,
 *  onSubmit?: (account: object) => void
 * }} props
 */
export default function accountModal({ open = false, type = 'create', account, onClose, onSubmit }) {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} maxWidth='lg' className='text-slate-200'>
        <DialogTitle className='bg-slate-800 text-slate-200'>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center gap-x-2'>
              <AccountBalance />
              <div>Add a new account</div>
            </div>

            <IconButton onClick={onClose} color='inherit'>
              <Close />
            </IconButton>
          </div>
        </DialogTitle>

        <DialogContent className='bg-slate-800 text-slate-200'>
          <DialogContentText className='text-slate-200'>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />
        </DialogContent>

        <DialogActions className='bg-slate-800 text-slate-200'>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
