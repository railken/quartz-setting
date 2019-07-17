import { ServiceProvider } from '@quartz/core'
import { container } from '@quartz/core'
import { UserSettingApi } from '../Api/UserSettingApi.js'
import { SettingStorage } from '../Services/SettingStorage.js'

export class SettingServiceProvider extends ServiceProvider {
  register() {

    this.addRoutes('app', require('./../../routes/setting-user.js'))

    this.addLang({
      'en': require('../../../lang/setting/en.json'),
      'it': require('../../../lang/setting/it.json')
    })
  }
  boot() {

    var api = new UserSettingApi()
    let storage = new SettingStorage();
    container.set('settings', storage);

    if (!window.user) {
      return;
    }

    return api.index({show: 99999}).then(response => {
      container.get('settings').load(response.body.data);
    })
  }
}
