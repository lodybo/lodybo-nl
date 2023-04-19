import { forwardRef, MouseEvent, useEffect, useRef, useState } from 'react';
import Icon from '~/components/Icon';

type InputProps = JSX.IntrinsicElements['input'] &
  JSX.IntrinsicElements['textarea'] & {
    readonly validity?: ValidityState;
  };

function getClasses(props: InputProps) {
  return `
      block shadow-sm
      focus:outline-none
      focus-visible:ring-4 focus-visible:ring-offset-4 focus-visible:ring-offset-nord-6 focus-visible:ring-nord-frost-2-600
      dark:focus-visible:ring-offset-nord-0
      px-4 py-2
      text-nord-0
      ${
        props.validity?.valid
          ? 'border-green-600 focus:ring-green-600'
          : 'border-red-600 focus:ring-red-600'
      }
      ${props.className}
    `;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={getClasses(props)} {...props} />
  ),
);
Input.displayName = 'Input';

export const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [textareaHeight, setTextareaHeight] = useState(200); // Initial textarea height
    const [isResizing, setIsResizing] = useState(false); // State to track if resizing is in progress
    const resizeContainerRef = useRef<HTMLButtonElement>(null); // Ref for the resize container div

    const handleMouseDown = (e: MouseEvent) => {
      if (e.buttons === 1) {
        setIsResizing(true); // Set resizing state to true when mouse down
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false); // Set resizing state to false when mouse up
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        // Only update textarea height if resizing is in progress
        const newHeight = textareaHeight + e.movementY; // Calculate new textarea height based on mouse movement
        setTextareaHeight(newHeight >= 50 ? newHeight : 50); // Set minimum height of textarea to 50 pixels
      }
    };

    useEffect(() => {
      const container = resizeContainerRef.current;

      if (!container) return;

      const handleMouseLeave = () => {
        if (isResizing) {
          // Set resizing state to false when mouse leaves the container
          setIsResizing(false);
        }
      };

      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [isResizing]);

    return (
      <>
        <textarea
          ref={ref}
          className={getClasses(props)}
          {...props}
          style={{ height: textareaHeight }}
        />
        <button
          ref={resizeContainerRef}
          type="button"
          className={`flex justify-center items-center w-full text-sm cursor-pointer select-none transition hover:bg-nord-aurora-0-400 ${
            isResizing ? 'hover:bg-nord-aurora-0-500' : 'bg-nord-frost-3-400'
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <Icon name="arrows-up-down" />
        </button>
      </>
    );
  },
);
TextArea.displayName = 'TextArea';
