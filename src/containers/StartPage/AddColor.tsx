import React, { Component, FormEvent } from 'react';
import { addColorsType } from './types';
import styles from './AddColor.module.scss';
import FilterColors from './components/FilterColors/FilterColors';

export default class AddColor extends Component {

  state: addColorsType = {
      colors: [{ color: '#000000', isAdded: false},
               { color: '#eb4034', isAdded: false},
               { color: '#89eb34', isAdded: false},
               { color: '#3474eb', isAdded: false},
               { color: '#bec4cf', isAdded: false}],
      newColor: '',
      colorError: ''
  }

  deleteColor = (color: string) => {
    const removedColor = this.state.colors.filter(c => c.color !== color)
    this.state.colors.length = 0
    this.state.colors.push(...removedColor)
    localStorage.removeItem(`color${color}`);
    this.forceUpdate()
}

  regexValidColor = /^[a-z0-9]+$/
  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (this.regexValidColor.test(this.state.newColor?.substring(1))
    && this.state.newColor?.length === 7 && this.state.newColor[0] === '#') {
        localStorage.setItem(`color${this.state.newColor}`, this.state.newColor)
        this.setState({colorError: ''})
        this.state.colors.push({ color: this.state.newColor.toUpperCase(), isAdded: true })
        this.forceUpdate()
    } else if (this.state.newColor?.length !== 7) {
        this.forceUpdate()
        this.setState({colorError: 'Color must have 7 characters'})
    } else if (!this.regexValidColor.test(this.state.newColor?.substring(1)) || 
        this.state.newColor[0] !== '#') {
        this.forceUpdate()
        this.setState({colorError: 'Color must be in HEX format'})
    }
  }
  render() {
      return (
          <><form onSubmit={(e) => this.handleSubmit(e)}>
              <p className={styles.formDescription}>Type your color:</p>
              <input className={styles.formInput} onChange={(e) => this.setState({newColor: e.target.value})} />
              <p className={`${styles.formError} ${this.state.newColor.length > 0 ? styles.formErrorOpen : ''}`}>{this.state.colorError}</p>
          </form>
          <FilterColors colors={this.state.colors} deleteColor={this.deleteColor} />
          </>
      )
  }
}