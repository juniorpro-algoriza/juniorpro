import { Field, Fieldset, Radio, RadioGroup } from '@headlessui/react';
import { radioButton, radioFieldset } from '@styles';

export const SignUpRadio = () => {
  const options = [
    { title: 'Register as contributor', value: 'contributor' },
    { title: 'Register as junior', value: 'junior' },
  ];

  return (
    <>
      <RadioGroup
        name='signInAs'
        defaultValue={options[0].value}
        className='w-full flex items-center justify-center'
      >
        <Fieldset className={radioFieldset}>
          {options.map(({ title, value }) => {
            return (
              <Field key={value}>
                <Radio value={value} className={radioButton}>
                  {title}
                </Radio>
              </Field>
            );
          })}
        </Fieldset>
      </RadioGroup>
    </>
  );
};
