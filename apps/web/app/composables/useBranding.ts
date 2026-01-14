export const useBranding = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const branding = useState('orgBranding', () => ({
    logo_url: '',
    primary_color: '#2D7FF9', // Default MockCBT Blue
    org_name: '',
  }))

  const applyBranding = (data: { logo_url?: string, primary_color?: string, name?: string }) => {
    if (data.primary_color) {
      branding.value.primary_color = data.primary_color
      if (import.meta.client) {
        document.documentElement.style.setProperty('--primary', data.primary_color)
        document.documentElement.style.setProperty('--ring', data.primary_color)
      }
    }
    if (data.logo_url) branding.value.logo_url = data.logo_url
    if (data.name) branding.value.org_name = data.name
  }

  const fetchBranding = async () => {
    if (!user.value) return

    try {
      const { data: memberData } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user.value.id)
        .single()

      if (memberData) {
        const { data: orgData } = await supabase
          .from('organizations')
          .select('name, branding')
          .eq('id', memberData.organization_id)
          .single()

        if (orgData) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const b = orgData.branding as any
          applyBranding({
            name: orgData.name,
            logo_url: b?.logo_url,
            primary_color: b?.primary_color,
          })
        }
      }
    }
    catch (e) {
      console.error('Failed to fetch branding:', e)
    }
  }

  return {
    branding,
    fetchBranding,
    applyBranding,
  }
}
