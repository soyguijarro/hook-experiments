import React, { useState } from 'react';
import getUniqueId from 'uuid/v1';
import styled from '@emotion/styled';
import Input from '../common/Input';
import Button from '../common/Button';
import { useList } from '../hooks/data';
import { useTextInput } from '../hooks/input';

const ListItemText = styled.p`
  text-decoration: ${({ done }) => (done ? 'line-through' : undefined)};
  flex: 1 0 auto;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.5rem;

  &:last-child {
    margin-bottom: 4rem;
  }
`;

const ListContainer = styled.ul`
  padding: 0 1rem;
  margin-top: 0.5rem;
  list-style-type: none;
`;

const EmptyMessage = styled.p`
  text-align: center;
  margin: 2rem 0;
`;

const List = ({
  todos,
  onDone: handleDone,
  onMove: handleMove,
  onEdit: handleEdit,
  onRemove: handleRemove,
  disabled,
}) => {
  if (!todos.length) {
    return <EmptyMessage>No items on your list</EmptyMessage>;
  }

  return (
    <ListContainer>
      {todos.map((todo, index) => (
        <ListItem key={index}>
          <ListItemText onClick={() => handleDone(todo)} done={todo.done}>
            {todo.text}
          </ListItemText>
          <div>
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <Button
              onClick={() => handleMove(todo, index)}
              disabled={disabled}
              title="Move"
              small
              inverted
            >
              ⬆️
            </Button>
            <Button
              onClick={() => handleEdit(todo, index)}
              disabled={disabled}
              title="Edit"
              small
              inverted
            >
              ✎
            </Button>
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <Button
              onClick={() => handleRemove(todo, index)}
              disabled={disabled}
              title="Delete"
              small
            >
              🗑️
            </Button>
          </div>
        </ListItem>
      ))}
    </ListContainer>
  );
};

const Form = styled.form`
  background-color: goldenrod;
  width: calc(100% + 2rem);
  padding: 0.25rem 2rem;
  transform: translateX(-1rem);
  display: flex;
  align-items: center;

  & > *:first-child {
    flex: 1 0 auto;
  }
`;

const InputBox = React.forwardRef(
  (
    {
      value,
      buttonText,
      onChange: handleChange,
      onSubmit: handleSubmit,
      onCancel: handleCancel,
      disabled,
      showCancel,
    },
    ref
  ) => (
    <Form
      onSubmit={event => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <Input
        ref={ref}
        type="text"
        placeholder="Enter item"
        onChange={handleChange}
        value={value}
        autoFocus
      />
      {showCancel && (
        // eslint-disable-next-line jsx-a11y/accessible-emoji
        <Button type="button" onClick={handleCancel} inverted small>
          ❌
        </Button>
      )}
      <Button type="submit" disabled={disabled} small>
        {buttonText}
      </Button>
    </Form>
  )
);

const initialTodos = [
  { text: 'Watch talks', done: false },
  { text: 'Read docs', done: false },
  { text: 'Play with hooks', done: false },
  { text: 'Buy carrots', done: false },
  { text: 'Save the world', done: false },
].map(todo => ({ id: getUniqueId(), ...todo }));

const Bottom = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  margin-bottom: 0.25rem;
`;

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;

  & > * {
    width: 100%;
  }
`;

const Section = styled.section`
  background-color: ${({ color }) => color};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Todo = () => {
  const [
    todos,
    { find, addLast: add, edit, remove },
    { set, reset, clear },
  ] = useList(initialTodos, { matcher: (todoId, todo) => todo.id === todoId });
  const [
    inputValue,
    props,
    { set: setInputValue, clear: clearInput, focus: focusInput },
  ] = useTextInput();
  const [editingTodoId, setEditingTodoId] = useState();

  const setEditingTodo = todo => {
    const setEmpty = todo === undefined;
    setEditingTodoId(setEmpty ? undefined : todo.id);
    if (setEmpty) {
      clearInput();
    } else {
      setInputValue(todo.text);
    }
    focusInput();
  };

  const isEditing = editingTodoId !== undefined;

  return (
    <Section color="gold">
      <Container>
        <InputBox
          buttonText={isEditing ? '✔️' : '+'}
          onSubmit={() => {
            if (isEditing) {
              edit(editingTodoId, todo => ({ ...todo, text: inputValue }));
              setEditingTodo();
            } else {
              add({ id: getUniqueId(), text: inputValue, done: false });
              clearInput();
            }
          }}
          onCancel={() => {
            setEditingTodo();
          }}
          showCancel={isEditing}
          disabled={
            isEditing ? inputValue === find(editingTodoId).text : !clearInput
          }
          {...props}
        />
        <div>
          <List
            todos={todos}
            onDone={todo => {
              edit(todo.id, todo => ({ ...todo, done: !todo.done }));
            }}
            onMove={(todo, index) => {
              const prevTodo = todos[index - 1];
              if (!prevTodo) return;

              edit(prevTodo.id, todo);
              edit(todo.id, prevTodo);
            }}
            onEdit={setEditingTodo}
            onRemove={todo => remove(todo.id)}
            disabled={isEditing}
          />
          <Bottom>
            <Button onClick={reset}>Undo all</Button>
            <Button
              onClick={() => {
                set(todos => todos.filter(({ done }) => !done));
              }}
              disabled={!todos.length || todos.every(({ done }) => !done)}
            >
              Clear done
            </Button>
            <Button onClick={clear} disabled={!todos.length}>
              Clear all
            </Button>
          </Bottom>
        </div>
      </Container>
    </Section>
  );
};

export default Todo;
