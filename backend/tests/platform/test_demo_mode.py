from agrisense.config import DataMode


def test_mock_provider_runtime_is_labeled_demo_in_api_envelopes(harness):
    harness.app.state.settings.agrisense_data_mode=DataMode.MOCK
    response=harness.get('/api/v1/me',headers={'Authorization':'Bearer token-asha'})
    assert response.status_code==200
    assert response.json()['meta']['data_mode']=='demo'
    harness.app.state.settings.agrisense_data_mode=DataMode.AUTO
    response=harness.get('/api/v1/me',headers={'Authorization':'Bearer token-asha'})
    assert response.status_code==200
    assert response.json()['meta']['data_mode']=='live'


def test_local_media_put_preflight_allows_only_configured_web_origins(harness):
    origin=harness.app.state.settings.cors_allowed_origins.split(',')[0].strip()
    response=harness.request('OPTIONS','/media/local/synthetic.png',headers={
        'Origin':origin,'Access-Control-Request-Method':'PUT',
        'Access-Control-Request-Headers':'content-type',
    })
    assert response.status_code==200
    assert response.headers['access-control-allow-origin']==origin
    assert 'PUT' in response.headers['access-control-allow-methods']
    rejected=harness.request('OPTIONS','/media/local/synthetic.png',headers={
        'Origin':'https://untrusted.example','Access-Control-Request-Method':'PUT',
    })
    assert rejected.status_code==400
    assert 'access-control-allow-origin' not in rejected.headers
