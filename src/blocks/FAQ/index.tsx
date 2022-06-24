/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import { Button } from '@keystone-ui/button';

export default component({
  label: 'Questions & Answers',
  schema: {
    questions: fields.array(
      fields.object({
        question: fields.child({ placeholder: 'Question', kind: 'inline' }),
        answer: fields.child({ placeholder: 'Answer', formatting: 'inherit', kind: 'block' }),
      })
    ),
  },
  preview: props => {
    return (
      <div>
        {props.fields.questions.elements.map(questionAndAnswer => {
          return (
            <div key={questionAndAnswer.key}>
              <h2>{questionAndAnswer.fields.question.element}</h2>
              <p>{questionAndAnswer.fields.answer.element}</p>
              <NotEditable>
                <Button
                  onClick={() => {
                    props.fields.questions.onChange(
                      props.fields.questions.elements
                        .filter(x => x.key !== questionAndAnswer.key)
                        .map(x => ({ key: x.key }))
                    );
                  }}
                >
                  Remove
                </Button>
              </NotEditable>
            </div>
          );
        })}
        <NotEditable>
          <Button
            onClick={() => {
              props.fields.questions.onChange([
                ...props.fields.questions.elements,
                { key: undefined },
              ]);
            }}
          >
            Insert
          </Button>
        </NotEditable>
      </div>
    );
  },
})