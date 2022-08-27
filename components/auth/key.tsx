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
  state: {
    isKeyValid: boolean,
    isPasswordValid: boolean,
  }
  setState: (state:
    {
      isKeyValid: boolean,
      isPasswordValid: boolean
    }
  ) => void,
}

export default function KeyInputField({ state, setState }: Props) {
  return (
    <input
      aria-label="key"
      type="password"
      name="key"
      placeholder="Key"
      className={classNames(
        state.isKeyValid && 'border-green-500',
        !state.isKeyValid && 'focus:border-red-500 border-gray-btn',
        'outline-none bg-transparent placeholder:text-xl placeholder:text-gray-text',
        'mb-6 border-2 py-4 px-4 w-full rounded-xl text-xl',
      )}
      onChange={(e) => {
        if (lengthTest(e.target.value) && !state.isKeyValid) {
          setState({ ...state, isKeyValid: true });
        }
        else if (!lengthTest(e.target.value) && state.isKeyValid) {
          setState({ ...state, isKeyValid: false });
        }
      }}
    />
  );
}