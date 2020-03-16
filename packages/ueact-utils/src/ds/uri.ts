import URI from 'urijs';

const utmParams = [
  'utm_source',
  'utm_medium',
  'utm_term',
  'utm_content',
  'utm_campaign',
  'utm_reader',
  'utm_place',
  'utm_userid',
  'utm_cid',
  'utm_name',
  'utm_pubreferrer',
  'utm_swu',
  'utm_viz_id',
  'ga_source',
  'ga_medium',
  'ga_term',
  'ga_content',
  'ga_campaign',
  'ga_place',
  'yclid',
  '_openstat',
  'fb_action_ids',
  'fb_action_types',
  'fb_ref',
  'fb_source',
  'action_object_map',
  'action_type_map',
  'action_ref_map',
  'gs_l',
  'pd_rd_r@amazon.*',
  'pd_rd_w@amazon.*',
  'pd_rd_wg@amazon.*',
  '_encoding@amazon.*',
  'psc@amazon.*',
  'ved@google.*',
  'ei@google.*',
  'sei@google.*',
  'gws_rd@google.*',
  'cvid@bing.com',
  'form@bing.com',
  'sk@bing.com',
  'sp@bing.com',
  'sc@bing.com',
  'qs@bing.com',
  'pq@bing.com',
  'feature@youtube.com',
  'gclid@youtube.com',
  'kw@youtube.com',
  '$/ref@amazon.&ast',
  '_hsenc',
  'mkt_tok',
  'hmb_campaign',
  'hmb_source',
  'hmb_medium',
  'fbclid',
  'spReportId',
  'spJobID',
  'spUserID',
  'spMailingID',
  'utm_mailing',
  'utm_brand',
  'CNDID',
  'mbid',
  'trk',
  'trkCampaign',
  'sc_campaign',
  'sc_channel',
  'sc_content',
  'sc_medium',
  'sc_outcome',
  'sc_geo',
  'sc_country'
];

/** 移除 UTM 相关的参数 */
export function removeUtmParamsFromQuery(originUrl: string) {
  if (!originUrl) {
    return originUrl;
  }

  let uriObj = URI(originUrl);

  utmParams.forEach(p => {
    uriObj.removeQuery(p);
  });

  return uriObj.href();
}

// See http://medialize.github.io/URI.js/docs.html
export const UrlUtils = URI;

/** 从 Url 中获取到最后的文件名 */
export function getFileNameFromUrl(href: string) {
  return URI(href).filename;
}
