/* eslint-disable max-len */
import style from '@/styles/button.module.css';

// preload all the  tailwind css classes
['bg-slate-600', 'bg-gray-600', 'bg-zinc-600', 'bg-neutral-600', 'bg-stone-600', 'bg-red-600', 'bg-orange-600', 'bg-amber-600', 'bg-yellow-600', 'bg-lime-600', 'bg-green-600', 'bg-teal-600', 'bg-cyan-600', 'bg-sky-600', 'bg-blue-600', 'bg-indigo-600', 'bg-violet-600', 'bg-purple-600', 'bg-fuchsia-600', 'bg-pink-600', 'bg-rose-600'];
['hover:bg-slate-700', 'hover:bg-gray-700', 'hover:bg-zinc-700', 'hover:bg-neutral-700', 'hover:bg-stone-700', 'hover:bg-red-700', 'hover:bg-orange-700', 'hover:bg-amber-700', 'hover:bg-yellow-700', 'hover:bg-lime-700', 'hover:bg-green-700', 'hover:bg-teal-700', 'hover:bg-cyan-700', 'hover:bg-sky-700', 'hover:bg-blue-700', 'hover:bg-indigo-700', 'hover:bg-violet-700', 'hover:bg-purple-700', 'hover:bg-fuchsia-700', 'hover:bg-pink-700', 'hover:bg-rose-700'];
['focus:ring-slate-600', 'focus:ring-gray-600', 'focus:ring-zinc-600', 'focus:ring-neutral-600', 'focus:ring-stone-600', 'focus:ring-red-600', 'focus:ring-orange-600', 'focus:ring-amber-600', 'focus:ring-yellow-600', 'focus:ring-lime-600', 'focus:ring-green-600', 'focus:ring-teal-600', 'focus:ring-cyan-600', 'focus:ring-sky-600', 'focus:ring-blue-600', 'focus:ring-indigo-600', 'focus:ring-violet-600', 'focus:ring-purple-600', 'focus:ring-fuchsia-600', 'focus:ring-pink-600', 'focus:ring-rose-600'];

/**
 * Button component
 * @param {{
 * icon?: string,
 * label?: string,
 * color: 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose' = 'gray',
 * type: 'button' | 'reset' | 'submit' = 'button',
 * loading: boolean = false,
 * disabled: boolean = false,
 * onClick?: Function
 * }} props
 * @returns
 */
export default function Button({ icon, label, color = 'gray', type = 'button', loading = false, disabled = false, onClick }) {
  const className = `${style.button} bg-${color}-600 text-neutral-50 hover:bg-${color}-700 focus:ring-opacity-35 focus:ring-${color}-600 ${disabled && 'cursor-not-allowed'} ${loading && 'cursor-wait'}`;

  return (
    <button className={className} disabled={disabled || loading} type={type} onClick={onClick}>
      {loading &&
        <div className='material-symbols-rounded animate-spin'>progress_activity</div>
      }

      {icon && !loading &&
        <div className='material-symbols-rounded'>{icon}</div>
      }

      {label &&
        <div className='w-max'>{label}</div>
      }
    </button>
  );
}
