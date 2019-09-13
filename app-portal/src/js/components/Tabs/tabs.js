import React from 'react';
import PropTypes from 'prop-types';
import { memoize } from 'lodash';

// COMPONENTS & STYLES
import { TabWrapper, TabButton, Pane } from './tabs.styles';


// HELPERS

/**
 * Replaces spaces with dashes
 * 
 * @param {string} name 
 */
function computeMachineName(name) {
  return name.toLowerCase().replace(/ /g, '-');
};

// Caches the machine name for a given name
const getMachineName = memoize(computeMachineName);

const Tabs = (props) => {
  const { panes } = props;
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div>
      <TabWrapper
        aria-label='Tabs'
        role='tablist'
        tabIndex={ 0 }
      >
        {
          panes.map((pane, index) => {
            return (
              <TabButton
                id={ `tab-${ getMachineName(pane.title) }` }
                key={ pane.title }
                type='button'
                role='tab'
                aria-selected={ index === activeIndex }
                onClick={ () => setActiveIndex(index) }
              >
                { pane.title }
              </TabButton>
            )
          })
        }
      </TabWrapper>
      <div>
        {
          panes.map((pane, index) => (
            <Pane
              id={ getMachineName(pane.title) }
              key={ getMachineName(pane.title) }
              hidden={ index !== activeIndex }
              role='tabpane'
              aria-labelledby={ `tab-${ getMachineName(pane.title) }` }
            >
              { index === activeIndex && pane.render() }
            </Pane>
          ))
        }
      </div>
    </div>
  );
};

Tabs.defaultProps = {};

Tabs.propTypes = {
  panes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      render: PropTypes.func.isRequired
    })
  ).isRequired
};

export default Tabs;