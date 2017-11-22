import { useStrict } from 'mobx';
import { enableLogging } from 'mobx-logger';

// MobX strict mode
useStrict(true);

// MobX logging
enableLogging({
  action: true,
  reaction: true,
  transaction: true,
  compute: true,
});