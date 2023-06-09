import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import Notification from '../Notification';

import { Container } from './App.styled.js';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const updateContacts = JSON.parse(localStorage.getItem('contacts'));
    if (updateContacts) {
      this.setState({ contacts: updateContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number, resetForm) => {
    const newContact = {
      name,
      id: nanoid(),
      number,
    };

    const isContactExists = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    return isContactExists
      ? alert(`${name} is already in contacts`)
      : this.setState(
          ({ contacts }) => ({
            contacts: [newContact, ...contacts],
          }),
          resetForm()
        );
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };
  getFilteredContacts = () => {
    const normalizedValue = this.state.filter?.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedValue)
    );
  };
  handleFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { contacts, filter } = this.state;
    const value = this.getFilteredContacts();
    return (
      <Container>
        <div className="form-wrapper">
          <h2 className="title">PhoneBook</h2>
          <ContactForm addContact={this.addContact} contacts={contacts} />
        </div>

        <div className="contactsWrapper">
          <h1 className="title">Contacts</h1>
          <div>
            <Filter name={filter} onChangeInput={this.handleFilterChange} />
            {value.length !== 0 ? (
              <ContactList
                contacts={value}
                handleDeleteBTN={this.deleteContact}
              />
            ) : (
              <Notification text={'No contacts are available.'} />
            )}
          </div>
        </div>
      </Container>
    );
  }
}
