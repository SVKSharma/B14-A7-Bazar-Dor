import { getPasswordRequirements } from '@/lib/password-policy';

interface PasswordRequirementsProps {
  password: string;
}

export default function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements = getPasswordRequirements(password);

  return (
    <div className="rounded-xl border border-emerald-900/10 bg-emerald-50/45 px-3 py-2">
      <p className="mb-1.5 text-[11px] font-semibold text-gray-600">
        শক্তিশালী পাসওয়ার্ডের নিয়ম
      </p>
      <ul className="space-y-1">
        {requirements.map((requirement) => (
          <li
            key={requirement.id}
            className={`flex items-center gap-2 text-[11px] font-medium ${
              requirement.isMet ? 'text-[#008a45]' : 'text-gray-500'
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
                requirement.isMet ? 'bg-[#008a45] text-white' : 'bg-white text-gray-400 ring-1 ring-gray-200'
              }`}
            >
              {requirement.isMet ? '✓' : '•'}
            </span>
            <span>{requirement.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
