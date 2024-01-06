import { useForm, zodResolver } from '@mantine/form';
import { Modal, Button, Box, TextInput, Select } from '@mantine/core';
import { IconCircleX, IconId, IconPig, IconDeviceFloppy, IconWallet } from '@tabler/icons-react';

import { accountCreateValidator } from '@/lib/zod/account';

const initialAccountValues = { name: '', type: null };

const accountTypes = [
  { value: 'savings', label: 'Savings' },
  { value: 'credit', label: 'Credit' },
];

/**
 * This component is a form to create or update accounts
 * @param {{
 *  opened: boolean = false,
 *  type: 'create' | 'update' |'retrieve' = 'create',
 *  account?: object,
 *  onClose?: () => void,
 *  onSubmit?: (account: object) => void
 * }} props
 */
export default function AccountModal({ opened = false, type = 'create', account, onClose, onSubmit }) {
  const title = (
    <div className='flex flex-row flex-nowrap items-center gap-x-2'>
      <IconWallet />
      <div>Create account</div>
    </div>
  );

  const form = useForm({
    name:                  'account-form',
    validateInputOnChange: true,
    initialValues:         { ...(account || initialAccountValues) },
    validate:              zodResolver(accountCreateValidator),
  });

  async function _onSubmit(event) {
    event.preventDefault();
    const res = await fetch('http://localhost:3000/api/accounts', { method: 'POST', body: JSON.stringify(form.values) });
    const { data } = await res.json();
    onClose();
    onSubmit?.(data);
  }

  return (
    <>
      <Modal centered opened={opened} onClose={onClose} title={title}>
        <Box max={340}>
          <form onSubmit={_onSubmit} className='flex flex-col gap-y-4'>
            <TextInput withAsterisk required label='Name' placeholder='Bancolombia' leftSection={<IconId size={14} />}
              {...form.getInputProps('name')} />

            <Select withAsterisk required clearable label='Type' placeholder='Savings'
              leftSection={<IconPig size={14} />} data={accountTypes} {...form.getInputProps('type')} />

            <div className='w-full flex flex-row flex-nowrap justify-end items-center gap-x-2 mt-3'>

              <Button type='submit' color='green' leftSection={<IconDeviceFloppy />} disabled={!form.isValid()}>
                Submit
              </Button>

              <Button color='red' leftSection={<IconCircleX />} onClick={onClose}>Cancel</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
