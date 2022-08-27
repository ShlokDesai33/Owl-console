function lengthTest(text: string): boolean {
  if (text.length === 0) {
    return false;
  }
  else return true;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  state: boolean,
  setState: (isPinValid: boolean) => void,
}

// pin: personal identification number
// it is known to the user as 'key'
export default function PinInputField({ state, setState }: Props) {
  return (
    <input
      aria-label="password"
      type="password"
      name="pin"
      placeholder="Enter key"
      className={classNames(
        state && 'border-green-500',
        !state && 'focus:border-red-500 border-gray-btn',
        'outline-none bg-transparent placeholder:text-xl placeholder:text-gray-text',
        'mb-6 border-2 py-4 px-4 w-full rounded-xl text-xl'
      )}
      onChange={(e) => {
        if (lengthTest(e.target.value) && !state) {
          setState(true);
        }
        else if (!lengthTest(e.target.value) && state) {
          setState(false);
        }
      }}
    />
  );
}