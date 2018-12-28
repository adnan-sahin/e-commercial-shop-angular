

export class CustomValidator {
  //validates url
  static urlValidator(url): any {
    if (url.pristine) {
      return null;
    }

    const URL_REGEXP = /^(http?|https|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;

    url.markAsTouched();

    if (URL_REGEXP.test(url.value)) {
      return null;
    }
    return { invalidUrl: true };
  }
}

