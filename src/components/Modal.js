import React, { Component } from 'react'
import Portal from './Portal'
export class Modal extends Component {
  render () {
    const { children, active } = this.props
    return (
      <Portal>
        {active && (
          <div>
            <section style={styles.modal}>
              <div style={styles.modalContainer}>{children}</div>
            </section>
          </div>
        )}
      </Portal>
    )
  }
}

const styles = {
  modalContainer: {
    position: 'absolute',
    top: '0',
    left: '0',
    buttom: '0',
    backgroundcolor: 'hsla(var(--hue), 18%, 75%, .8)',
    width: '100%',
    height: '100%',
    display: 'grid',
    alignitems: 'flex-end',
    transition: 'all .3s',
    zindex: 'var(--z-modal)'
  },
  modal: {
    height: '100vh',
    display: 'grid',
    placeitems: 'center',
    marginleft: '1rem',
    marginright: '1rem'
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  '@media (max-width: 767px)': {
    wrapper: {
      height: '75%',
      bottom: 0,
      top: 'auto'
    }
  }
}
